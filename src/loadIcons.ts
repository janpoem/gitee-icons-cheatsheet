export type IconsMap = Record<string, string>;

let icons: IconsMap | null = null;

const reg = /.gitee-icon.([a-z0-9-_]+):before[\s\t]?\{[\n\s\t]+content:[\s\t]?[\'\"]([^\'\"]+)[\'\"]/igm;

const extractIcons = (text: string): IconsMap => {
  const _icons: IconsMap = {};
  reg.lastIndex = 0;
  let match: RegExpExecArray | null = null;
  while ((match = reg.exec(text)) != null) {
    _icons[match[1]] = match[2].replace('\\', '');
  }
  return Object.keys(_icons).sort().reduce(
    (obj: Record<string, string>, key) => {
      obj[key] = _icons[key];
      return obj;
    },
    {},
  );
};

export const loadIcons = async (refresh = false): Promise<IconsMap> => {
  return new Promise<IconsMap>(async (resolve) => {
    if (icons == null || refresh) {
      const res = await fetch('css/icons.css');
      const text = await res.text();
      icons = extractIcons(text);
      resolve(icons);
    } else {
      resolve(icons);
    }
  });
};
