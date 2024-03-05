import React from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';
import { Save } from '../../icons';
// import { Tooltip } from 'antd';

interface SaveProps {
  disabled: boolean;
  onSave: () => void;
  title?: string;
}

const SaveButton = observer(({ onSave, disabled, title }: SaveProps) => (
  // <Tooltip placement="bottom" title={title}>
    <div
      className={cx('icon-button', {
        'icon-button--disabled': disabled,
      })}
      onClick={() => onSave()}
    >
      <Save />
    </div>
  // </Tooltip>
));

export default SaveButton;
