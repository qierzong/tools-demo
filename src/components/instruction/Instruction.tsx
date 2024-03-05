import React, { useContext } from 'react';

import './Instruction.scss';

interface InstructionProps {
}
const Instruction = ({ }: InstructionProps) => {
  return (
    <div className="instruction">
      <div className="instruction-title" style={{ marginBottom: 8 }}>提示：</div>
      <div className="instruction-content">
        请描述该图片的场景及物体之间的位置关系
      </div>
    </div>
  );
};
export default Instruction;
