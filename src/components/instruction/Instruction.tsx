import React, { useContext } from 'react';

import './Instruction.scss';

interface InstructionProps {
}
const Instruction = ({ }: InstructionProps) => {
  return (
    <div className="instruction">
      <div className="instruction-title">提示：</div>
      <div className="instruction-content">
        请描述改图片的场景及物体之间的关系
      </div>
    </div>
  );
};
export default Instruction;
