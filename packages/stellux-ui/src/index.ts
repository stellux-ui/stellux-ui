import type { App } from 'vue'
import {
  StxButton, StxButtonGroup,
  StxContainer, StxHeader, StxFooter, StxAside, StxMain,
  StxRow, StxCol,
  StxInput,
  StxIcon,
  StxLink,
  StxText,
  StxDivider,
  StxTag,
  StxSpace,
  StxBadge,
  StxScrollbar,
  StxAlert,
  StxSplitter, StxSplitterPanel,
  StxTooltip,
  StxPopover,
  StxForm, StxFormItem,
  StxRadio, StxRadioGroup,
  StxCheckbox, StxCheckboxGroup,
  StxSwitch,
  StxInputNumber,
  StxSelect, StxOption, StxOptionGroup,
  StxOverlay,
  StxCollapseTransition,
  StxDialog,
  StxDrawer,
  StxMessage,
  StxNotification,
  StxMessageBox,
  StxLoadingService,
  vLoading,
  StxPopconfirm,
  StxMenu, StxMenuItem, StxMenuItemGroup, StxSubMenu,
  StxTabs, StxTabPane,
  StxBreadcrumb, StxBreadcrumbItem,
  StxDropdown, StxDropdownItem, StxDropdownMenu,
  StxPageHeader,
  StxSteps, StxStep,
  StxAffix,
  StxBacktop,
  StxAnchor, StxAnchorLink,
  StxCard,
  StxAvatar,
  StxEmpty,
  StxResult,
  StxProgress,
  StxStatistic, StxCountdown,
  StxCollapse, StxCollapseItem,
  StxSkeleton, StxSkeletonItem,
  StxSegmented,
  StxTimeline, StxTimelineItem,
  StxDescriptions, StxDescriptionsItem,
  vInfiniteScroll,
  StxTable, StxTableColumn,
  StxImage, StxImageViewer,
  StxRate,
  StxSlider,
  StxAutocomplete,
  StxMention,
  StxPagination,
  StxUpload,
  StxColorPicker,
  StxTransfer,
  StxCascader,
  StxDatePicker,
  StxTour, StxTourStep,
  StxWatermark,
  StxInputTag,
  StxInputOtp,
  StxTimePicker,
  StxTree,
  StxTreeSelect,
  StxCarousel, StxCarouselItem,
  StxCalendar,
} from '@stellux/components'
import { vRipple } from '@stellux/directives'
import '@stellux/theme/src/index.scss'

const components = [
  StxButton, StxButtonGroup,
  StxContainer, StxHeader, StxFooter, StxAside, StxMain,
  StxRow, StxCol,
  StxInput,
  StxIcon,
  StxLink,
  StxText,
  StxDivider,
  StxTag,
  StxSpace,
  StxBadge,
  StxScrollbar,
  StxAlert,
  StxSplitter, StxSplitterPanel,
  StxTooltip,
  StxPopover,
  StxForm, StxFormItem,
  StxRadio, StxRadioGroup,
  StxCheckbox, StxCheckboxGroup,
  StxSwitch,
  StxInputNumber,
  StxSelect, StxOption, StxOptionGroup,
  StxOverlay,
  StxCollapseTransition,
  StxDialog,
  StxDrawer,
  StxPopconfirm,
  StxMenu, StxMenuItem, StxMenuItemGroup, StxSubMenu,
  StxTabs, StxTabPane,
  StxBreadcrumb, StxBreadcrumbItem,
  StxDropdown, StxDropdownItem, StxDropdownMenu,
  StxPageHeader,
  StxSteps, StxStep,
  StxAffix,
  StxBacktop,
  StxAnchor, StxAnchorLink,
  StxCard,
  StxAvatar,
  StxEmpty,
  StxResult,
  StxProgress,
  StxStatistic, StxCountdown,
  StxCollapse, StxCollapseItem,
  StxSkeleton, StxSkeletonItem,
  StxSegmented,
  StxTimeline, StxTimelineItem,
  StxDescriptions, StxDescriptionsItem,
  StxTable, StxTableColumn,
  StxImage, StxImageViewer,
  StxRate,
  StxSlider,
  StxAutocomplete,
  StxMention,
  StxPagination,
  StxUpload,
  StxColorPicker,
  StxTransfer,
  StxCascader,
  StxDatePicker,
  StxTour, StxTourStep,
  StxWatermark,
  StxInputTag,
  StxInputOtp,
  StxTimePicker,
  StxTree,
  StxTreeSelect,
  StxCarousel, StxCarouselItem,
  StxCalendar,
]

export function install(app: App) {
  components.forEach((component) => {
    if (component && 'install' in component) {
      app.use(component)
    }
  })
  app.directive('ripple', vRipple)
  app.directive('loading', vLoading)
  app.directive('infinite-scroll', vInfiniteScroll)
  app.config.globalProperties.$message = StxMessage
  app.config.globalProperties.$notify = StxNotification
  app.config.globalProperties.$msgbox = StxMessageBox
  app.config.globalProperties.$loading = StxLoadingService
}

export { StxButton, StxButtonGroup } from '@stellux/components'
export { StxContainer, StxHeader, StxFooter, StxAside, StxMain } from '@stellux/components'
export { StxRow, StxCol } from '@stellux/components'
export { StxInput } from '@stellux/components'
export { StxIcon } from '@stellux/components'
export { StxLink } from '@stellux/components'
export { StxText } from '@stellux/components'
export { StxDivider } from '@stellux/components'
export { StxTag } from '@stellux/components'
export { StxSpace } from '@stellux/components'
export { StxBadge } from '@stellux/components'
export { StxScrollbar } from '@stellux/components'
export { StxAlert } from '@stellux/components'
export { StxSplitter, StxSplitterPanel } from '@stellux/components'
export { StxTooltip } from '@stellux/components'
export { StxPopover } from '@stellux/components'
export { StxForm, StxFormItem } from '@stellux/components'
export { StxRadio, StxRadioGroup } from '@stellux/components'
export { StxCheckbox, StxCheckboxGroup } from '@stellux/components'
export { StxSwitch } from '@stellux/components'
export { StxInputNumber } from '@stellux/components'
export { StxSelect, StxOption, StxOptionGroup } from '@stellux/components'
export { StxOverlay } from '@stellux/components'
export { StxCollapseTransition } from '@stellux/components'
export { StxDialog } from '@stellux/components'
export { StxDrawer } from '@stellux/components'
export { StxMessage } from '@stellux/components'
export { StxNotification } from '@stellux/components'
export { StxMessageBox } from '@stellux/components'
export { StxLoadingService, vLoading } from '@stellux/components'
export { StxPopconfirm } from '@stellux/components'
export { StxMenu, StxMenuItem, StxMenuItemGroup, StxSubMenu } from '@stellux/components'
export { StxTabs, StxTabPane } from '@stellux/components'
export { StxBreadcrumb, StxBreadcrumbItem } from '@stellux/components'
export { StxDropdown, StxDropdownItem, StxDropdownMenu } from '@stellux/components'
export { StxPageHeader } from '@stellux/components'
export { StxSteps, StxStep } from '@stellux/components'
export { StxAffix } from '@stellux/components'
export { StxBacktop } from '@stellux/components'
export { StxAnchor, StxAnchorLink } from '@stellux/components'
export { StxCard } from '@stellux/components'
export { StxAvatar } from '@stellux/components'
export { StxEmpty } from '@stellux/components'
export { StxResult } from '@stellux/components'
export { StxProgress } from '@stellux/components'
export { StxStatistic, StxCountdown } from '@stellux/components'
export { StxCollapse, StxCollapseItem } from '@stellux/components'
export { StxSkeleton, StxSkeletonItem } from '@stellux/components'
export { StxSegmented } from '@stellux/components'
export { StxTimeline, StxTimelineItem } from '@stellux/components'
export { StxDescriptions, StxDescriptionsItem } from '@stellux/components'
export { vInfiniteScroll } from '@stellux/components'
export { StxTable, StxTableColumn } from '@stellux/components'
export { StxImage, StxImageViewer } from '@stellux/components'
export { StxRate } from '@stellux/components'
export { StxSlider } from '@stellux/components'
export { StxAutocomplete } from '@stellux/components'
export { StxMention } from '@stellux/components'
export { StxPagination } from '@stellux/components'
export { StxUpload } from '@stellux/components'
export { StxColorPicker } from '@stellux/components'
export { StxTransfer } from '@stellux/components'
export { StxCascader } from '@stellux/components'
export { StxDatePicker } from '@stellux/components'
export { StxTour, StxTourStep } from '@stellux/components'
export { StxWatermark } from '@stellux/components'
export { StxInputTag } from '@stellux/components'
export { StxInputOtp } from '@stellux/components'
export { StxTimePicker } from '@stellux/components'
export { StxTree } from '@stellux/components'
export { StxTreeSelect } from '@stellux/components'
export { StxCarousel, StxCarouselItem } from '@stellux/components'
export { StxCalendar } from '@stellux/components'
export { vRipple } from '@stellux/directives'
export * from '@stellux/hooks'

export default { install }
