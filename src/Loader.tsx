import React from 'react';

export type LoaderProps = {
  text?: string | null,
  loading?: Boolean
}

export const Loader: React.FC<LoaderProps> = ({ loading, text, children }) => {
  if (!loading) return null;
  const content = text || children;
  return (
    <div className="loader">
      <div className="lds-dual-ring"/>
      {content ? <div className="content">{content}</div> : null}
    </div>
  );
};
