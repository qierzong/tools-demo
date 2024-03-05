import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { Rect } from '../shapes/rect';
import TextArea from 'antd/es/input/TextArea';


interface InputWrapperProps {
  tagValue?: Rect;

}

const InputWrapper: React.FC<InputWrapperProps> = ({
  tagValue
}) => { console.log('tagValue', tagValue)
  const [value, setValue] = useState('');
  const textRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (tagValue && tagValue.text) {
      const newValue = `${value}${tagValue.text}`
      setValue(newValue)
    }
  }, [tagValue])
  return (
    <TextArea
      ref={textRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="请在此处输入..."
      autoSize={{ minRows: 3, maxRows: 5 }}
    />
  );
};

export default InputWrapper;
