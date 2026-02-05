import { appendIconComponentCache } from '@elastic/eui/es/components/icon/icon';

import { icon as EuiIconPin } from '@elastic/eui/es/components/icon/assets/pin';
import { icon as EuiIconTrash } from '@elastic/eui/es/components/icon/assets/trash';
import { icon as EuiIconPencil } from '@elastic/eui/es/components/icon/assets/pencil';
import { icon as EuiIconCross } from '@elastic/eui/es/components/icon/assets/cross';
import { icon as EuiIconCheck } from '@elastic/eui/es/components/icon/assets/check';
import { icon as EuiIconEmpty } from '@elastic/eui/es/components/icon/assets/empty';
import { icon as EuiIconArrowDown } from '@elastic/eui/es/components/icon/assets/arrow_down';
import { icon as EuiIconArrowRight } from '@elastic/eui/es/components/icon/assets/arrow_right';
import { icon as EuiIconSortDown } from '@elastic/eui/es/components/icon/assets/sort_down';
import { icon as EuiIconSortUp } from '@elastic/eui/es/components/icon/assets/sort_up';
import { icon as EuiIconPlusInCircle } from '@elastic/eui/es/components/icon/assets/plus_in_circle';
import { icon as EuiIconPlusInCircleFilled } from '@elastic/eui/es/components/icon/assets/plus_in_circle_filled';
import { icon as EuiIconMinusInCircle } from '@elastic/eui/es/components/icon/assets/minus_in_circle';
import { icon as EuiIconEditorCodeBlock } from '@elastic/eui/es/components/icon/assets/editor_code_block';
import { icon as EuiIconTokenString } from '@elastic/eui/es/components/icon/assets/tokenString';
import { icon as EuiIconTokenDate } from '@elastic/eui/es/components/icon/assets/tokenDate';
import { icon as EuiIconFolderOpen } from '@elastic/eui/es/components/icon/assets/folder_open';
import { icon as EuiIconQuestionInCircle } from '@elastic/eui/es/components/icon/assets/question_in_circle';
import { icon as EuiIconKqlField } from '@elastic/eui/es/components/icon/assets/kql_field';
import { icon as EuiIconKqlOperand } from '@elastic/eui/es/components/icon/assets/kql_operand';
import { icon as EuiIconKqlSelector } from '@elastic/eui/es/components/icon/assets/kql_selector';
import { icon as EuiIconKqlValue } from '@elastic/eui/es/components/icon/assets/kql_value';
import { icon as EuiIconIndexOpen } from '@elastic/eui/es/components/icon/assets/index_open';
import { icon as EuiIconEyeClosed } from '@elastic/eui/es/components/icon/assets/eye_closed';
import { icon as EuiIconCopyClipboard } from '@elastic/eui/es/components/icon/assets/copy_clipboard';
import { icon as EuiIconReturnKey } from '@elastic/eui/es/components/icon/assets/return_key';

import { icon as EuiIconMagnifyWithPlus } from '@elastic/eui/es/components/icon/assets/magnifyWithPlus';
import { icon as EuiIconMagnifyWithMinus } from '@elastic/eui/es/components/icon/assets/magnifyWithMinus';
import { icon as EuiIconTableOfContents } from '@elastic/eui/es/components/icon/assets/tableOfContents';
import { icon as EuiIconTokenNumber } from '@elastic/eui/es/components/icon/assets/tokenNumber';
import { icon as EuiIconTokenBoolean } from '@elastic/eui/es/components/icon/assets/tokenBoolean';

// One or more icons are passed in as an object of iconKey (string): IconComponent
appendIconComponentCache({
    pin: EuiIconPin,
    trash: EuiIconTrash,
    pencil: EuiIconPencil,
    cross: EuiIconCross,
    check: EuiIconCheck,
    empty: EuiIconEmpty,
    arrowDown: EuiIconArrowDown,
    arrowRight: EuiIconArrowRight,
    sortDown: EuiIconSortDown,
    sortUp: EuiIconSortUp,
    plusInCircle: EuiIconPlusInCircle,
    plusInCircleFilled: EuiIconPlusInCircleFilled,
    minusInCircle: EuiIconMinusInCircle,
    editorCodeBlock: EuiIconEditorCodeBlock,
    tokenString: EuiIconTokenString,
    tokenDate: EuiIconTokenDate,
    folderOpen: EuiIconFolderOpen,
    questionInCircle: EuiIconQuestionInCircle,
    kqlField: EuiIconKqlField,
    kqlOperand: EuiIconKqlOperand,
    kqlSelector: EuiIconKqlSelector,
    kqlValue: EuiIconKqlValue,
    indexOpen: EuiIconIndexOpen,
    eyeClosed: EuiIconEyeClosed,
    copyClipboard: EuiIconCopyClipboard,
    returnKey: EuiIconReturnKey,

    magnifyWithPlus: EuiIconMagnifyWithPlus,
    magnifyWithMinus: EuiIconMagnifyWithMinus,
    tableOfContents: EuiIconTableOfContents,
    tokenNumber: EuiIconTokenNumber,
    tokenBoolean: EuiIconTokenBoolean
});