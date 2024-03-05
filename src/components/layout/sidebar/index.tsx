import React, { useState } from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';
import './Sidebar.scss';


interface FragmentProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

interface Props {
  children: React.ReactNode;
}

const Sidebar = observer(({ children }: Props) => {

  return (
    <div className="sidebar">
      <>
        {children}
      </>
    </div>
  );
});

export default Sidebar;

export const AnnotationResultPanel = ({ className, style, children }: FragmentProps) => (
  <div
    className={cx('annotation-result-panel', className)}
    style={style}
  >
    {children}
  </div>
);
