import React, { ChangeEvent, useEffect, useState } from 'react';
import { Icons } from './Icons';
import { Loader } from './Loader';
import { IconsMap, loadIcons } from './loadIcons';

export type AppProps = {
  // empty interface
}

export const App: React.FC<AppProps> = () => {
  const [icons, setIcons] = useState<IconsMap | null>(null);
  const [search, setSearch] = useState<string>('');
  
  useEffect(() => {
    if (icons == null) {
      loadIcons().then(setIcons);
    }
  }, [icons]);
  
  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  
  return (
    <React.Fragment>
      <Loader loading={icons == null} text={'提取图标中...'}/>
      <div className="header">
        <input value={search} placeholder={'搜索码云图标'} className={'search-input'} onChange={onChangeSearch}/>
      </div>
      <div className="body">
        <Icons search={search} icons={icons}/>
      </div>
    </React.Fragment>
  );
};


