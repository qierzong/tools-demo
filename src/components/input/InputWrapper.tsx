import React from 'react';
import TextArea from 'antd/es/input/TextArea';

interface InputWrapperProps {
  value?: string;
  onChange: (val: string) => void;
}

const InputWrapper: React.FC<InputWrapperProps> = ({
  value,
  onChange
}) => {
  return (
    <TextArea
      autoFocus
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="请在此处输入..."
      autoSize={{ minRows: 10 }}
    />
  );
};

export default InputWrapper;
