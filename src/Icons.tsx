import React, { useMemo } from 'react';
import { IconsMap } from './loadIcons';

export type IconsProps = {
  icons: IconsMap | null,
  search?: string | null,
}

export const Icons: React.FC<IconsProps> = ({ search, icons }) => {
  if (icons == null) return null;
  
  const keys = useMemo(() => Object.keys(icons), [icons]);
  const pattern = useMemo(() => search == null || search.trim() === '' ? null : new RegExp(search, 'ig'), [search]);
  
  const filterKeys = useMemo(() => {
    if (pattern == null) {
      return keys;
    }
    return keys.filter(k => pattern.test(k));
  }, [pattern, keys]);
  
  return (
    <div className={'icons-list'}>
      {filterKeys.map(key => {
        return (
          <div className={'icon-it'}>
            <span
              className={`gitee-icon icon-unicode`}
              dangerouslySetInnerHTML={{ __html: '&#x' + icons[key] }}
            />
            <div className={'icon-cls'}>{key}</div>
          </div>
        );
      })}
    </div>
  );
};
