<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { treeProps, treeEmits, type TreeNode } from './tree'
import StxCheckbox from '../checkbox/checkbox.vue'

defineOptions({ name: 'StxTree' })

const props = defineProps(treeProps)
const emit = defineEmits(treeEmits)

const ns = useNamespace('tree')

// Internal state
const flatNodes = ref<TreeNode[]>([])
const currentNode = ref<TreeNode | null>(null)
let nodeKeyCounter = 0

function generateKey(): string | number {
  return `__tree_node_${nodeKeyCounter++}`
}

function getNodeKey(item: any): string | number {
  if (props.nodeKey && item[props.nodeKey] != null) {
    return item[props.nodeKey]
  }
  return generateKey()
}

function buildTree(
  data: any[],
  parent: TreeNode | undefined,
  level: number,
): TreeNode[] {
  const labelProp = props.props.label || 'label'
  const childrenProp = props.props.children || 'children'
  const disabledProp = props.props.disabled || 'disabled'
  const isLeafProp = props.props.isLeaf || 'isLeaf'

  const result: TreeNode[] = []

  for (const item of data) {
    const key = getNodeKey(item)
    const childData = item[childrenProp]
    const hasChildren = Array.isArray(childData) && childData.length > 0

    const node: TreeNode = {
      key,
      label: item[labelProp] ?? '',
      children: [],
      disabled: !!item[disabledProp],
      isLeaf: props.lazy ? !!item[isLeafProp] : !hasChildren,
      data: item,
      level,
      expanded:
        props.defaultExpandAll || props.defaultExpandedKeys.includes(key),
      checked: props.defaultCheckedKeys.includes(key),
      indeterminate: false,
      parent,
      visible: true,
      loaded: false,
      loading: false,
    }

    result.push(node)

    if (hasChildren) {
      node.children = buildTree(childData, node, level + 1)
      result.push(...node.children)
    } else if (props.lazy && !node.isLeaf) {
      // Lazy node, no children yet
      node.children = []
    }
  }

  return result
}

function initTree() {
  nodeKeyCounter = 0
  const allNodes = buildTree(props.data, undefined, 0)
  flatNodes.value = allNodes

  // Initialize checked states — propagate from default checked keys
  if (props.defaultCheckedKeys.length > 0 && !props.checkStrictly) {
    for (const node of allNodes) {
      if (node.checked) {
        propagateCheckDown(node, true)
        bubbleCheckUp(node)
      }
    }
  }

  // Auto expand parent of expanded nodes
  if (props.autoExpandParent) {
    for (const node of allNodes) {
      if (node.expanded && node.parent) {
        expandParents(node)
      }
    }
  }

  // Set current node
  if (props.currentNodeKey != null) {
    const target = allNodes.find((n) => n.key === props.currentNodeKey)
    if (target) {
      currentNode.value = target
    }
  }
}

function expandParents(node: TreeNode) {
  let parent = node.parent
  while (parent) {
    parent.expanded = true
    parent = parent.parent
  }
}

// Only top-level nodes (not children of other nodes) OR nodes whose parent chain is all expanded
const visibleNodes = computed(() => {
  return flatNodes.value.filter((node) => {
    if (!node.visible) return false
    let parent = node.parent
    while (parent) {
      if (!parent.expanded || !parent.visible) return false
      parent = parent.parent
    }
    return true
  })
})

function isLeaf(node: TreeNode): boolean {
  if (props.lazy) {
    return node.isLeaf
  }
  return node.children.length === 0
}

function toggleExpand(node: TreeNode) {
  if (isLeaf(node)) return

  if (props.lazy && !node.loaded && !node.loading && props.load) {
    node.loading = true
    props.load(node, (childData: any[]) => {
      node.loading = false
      node.loaded = true
      if (childData && childData.length > 0) {
        const childNodes = buildTree(childData, node, node.level + 1)
        node.children = childNodes

        // Insert child nodes after the current node in flatNodes
        const idx = flatNodes.value.indexOf(node)
        if (idx !== -1) {
          flatNodes.value.splice(idx + 1, 0, ...childNodes)
        }

        node.expanded = true
        emit('node-expand', node.data, node)
      } else {
        node.isLeaf = true
      }
    })
    return
  }

  if (props.accordion) {
    // Collapse all sibling nodes
    const siblings = flatNodes.value.filter(
      (n) =>
        n.parent === node.parent && n.level === node.level && n !== node,
    )
    for (const sibling of siblings) {
      if (sibling.expanded) {
        sibling.expanded = false
        emit('node-collapse', sibling.data, sibling)
      }
    }
  }

  node.expanded = !node.expanded

  if (node.expanded) {
    emit('node-expand', node.data, node)
  } else {
    emit('node-collapse', node.data, node)
  }
}

function handleNodeClick(node: TreeNode, e: MouseEvent) {
  if (node.disabled) return

  emit('node-click', node.data, node, e)

  if (props.expandOnClickNode && !isLeaf(node)) {
    toggleExpand(node)
  }

  if (props.checkOnClickNode && props.showCheckbox) {
    handleCheckChange(node, !node.checked)
  }

  if (props.highlightCurrent) {
    const prev = currentNode.value
    currentNode.value = node
    if (prev !== node) {
      emit('current-change', node.data, node)
    }
  }
}

// Checkbox logic
function propagateCheckDown(node: TreeNode, checked: boolean) {
  node.checked = checked
  node.indeterminate = false
  for (const child of node.children) {
    if (!child.disabled) {
      propagateCheckDown(child, checked)
    }
  }
}

function bubbleCheckUp(node: TreeNode) {
  let parent = node.parent
  while (parent) {
    const children = parent.children
    const allChecked = children.every((c) => c.checked)
    const someChecked = children.some((c) => c.checked || c.indeterminate)
    parent.checked = allChecked
    parent.indeterminate = !allChecked && someChecked
    parent = parent.parent
  }
}

function handleCheckChange(node: TreeNode, checked: boolean) {
  if (node.disabled) return

  if (props.checkStrictly) {
    node.checked = checked
    node.indeterminate = false
  } else {
    propagateCheckDown(node, checked)
    bubbleCheckUp(node)
  }

  emit('check-change', node.data, node.checked, node.indeterminate)
  emit('check', node.data, {
    checkedNodes: getCheckedNodes(),
    checkedKeys: getCheckedKeys(),
  })
}

// Public methods
function filter(value: string) {
  const filterFn = props.filterNodeMethod
  if (!filterFn) return

  for (const node of flatNodes.value) {
    node.visible = filterFn(value, node.data, node)
  }

  // If a child is visible, make sure its ancestors are visible
  for (const node of flatNodes.value) {
    if (node.visible) {
      let parent = node.parent
      while (parent) {
        parent.visible = true
        parent = parent.parent
      }
    }
  }
}

function getCheckedNodes(leafOnly = false): any[] {
  return flatNodes.value
    .filter((n) => {
      if (leafOnly && !isLeaf(n)) return false
      return n.checked
    })
    .map((n) => n.data)
}

function getCheckedKeys(leafOnly = false): (string | number)[] {
  return flatNodes.value
    .filter((n) => {
      if (leafOnly && !isLeaf(n)) return false
      return n.checked
    })
    .map((n) => n.key)
}

function setCheckedKeys(keys: (string | number)[]) {
  // First uncheck all
  for (const node of flatNodes.value) {
    node.checked = false
    node.indeterminate = false
  }

  // Then check the specified keys
  for (const node of flatNodes.value) {
    if (keys.includes(node.key)) {
      if (props.checkStrictly) {
        node.checked = true
      } else {
        propagateCheckDown(node, true)
      }
    }
  }

  // Bubble up
  if (!props.checkStrictly) {
    for (const node of flatNodes.value) {
      if (node.checked && node.parent) {
        bubbleCheckUp(node)
      }
    }
  }
}

function setCurrentKey(key: string | number | undefined) {
  if (key == null) {
    currentNode.value = null
    return
  }
  const node = flatNodes.value.find((n) => n.key === key)
  if (node) {
    currentNode.value = node
    emit('current-change', node.data, node)
  }
}

function getCurrentNode(): TreeNode | null {
  return currentNode.value
}

// Watch data changes
watch(
  () => props.data,
  () => {
    initTree()
  },
  { immediate: true, deep: true },
)

defineExpose({
  filter,
  getCheckedNodes,
  getCheckedKeys,
  setCheckedKeys,
  setCurrentKey,
  getCurrentNode,
})
</script>

<template>
  <div :class="ns.b()" role="tree">
    <template v-for="node in visibleNodes" :key="node.key">
      <div
        :class="[
          ns.e('node'),
          ns.is('expanded', node.expanded),
          ns.is('current', highlightCurrent && node === currentNode),
          ns.is('focusable', !node.disabled),
          ns.is('disabled', node.disabled),
        ]"
        :style="{ paddingLeft: node.level * indent + 'px' }"
        @click="handleNodeClick(node, $event)"
      >
        <!-- Expand icon -->
        <span
          :class="[
            ns.e('expand-icon'),
            ns.is('expanded', node.expanded),
            ns.is('leaf', isLeaf(node)),
          ]"
          @click.stop="toggleExpand(node)"
        >
          <svg
            v-if="!isLeaf(node)"
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span v-if="node.loading" :class="ns.e('loading-icon')">
            <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </span>
        </span>

        <!-- Checkbox -->
        <stx-checkbox
          v-if="showCheckbox"
          :model-value="node.checked"
          :indeterminate="node.indeterminate"
          :disabled="node.disabled"
          @change="handleCheckChange(node, $event as boolean)"
          @click.stop
        />

        <!-- Content -->
        <span :class="ns.e('node-content')">
          <slot :node="node" :data="node.data">{{ node.label }}</slot>
        </span>
      </div>
    </template>
    <div v-if="!visibleNodes.length" :class="ns.e('empty')">
      <slot name="empty">{{ emptyText }}</slot>
    </div>
  </div>
</template>
