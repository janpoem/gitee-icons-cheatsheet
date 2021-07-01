(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('react'), require('react-dom')) :
    typeof define === 'function' && define.amd ? define(['react', 'react-dom'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.React, global.ReactDOM));
}(this, (function (React, ReactDOM) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
    var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

    const Icons = ({ search, icons }) => {
        if (icons == null)
            return null;
        const keys = React.useMemo(() => Object.keys(icons), [icons]);
        const pattern = React.useMemo(() => search == null || search.trim() === '' ? null : new RegExp(search, 'ig'), [search]);
        const filterKeys = React.useMemo(() => {
            if (pattern == null) {
                return keys;
            }
            return keys.filter(k => pattern.test(k));
        }, [pattern, keys]);
        return (React__default['default'].createElement("div", { className: 'icons-list' }, filterKeys.map(key => {
            return (React__default['default'].createElement("div", { className: 'icon-it' },
                React__default['default'].createElement("span", { className: `gitee-icon icon-unicode`, dangerouslySetInnerHTML: { __html: '&#x' + icons[key] } }),
                React__default['default'].createElement("div", { className: 'icon-cls' }, key)));
        })));
    };

    const Loader = ({ loading, text, children }) => {
        if (!loading)
            return null;
        const content = text || children;
        return (React__default['default'].createElement("div", { className: "loader" },
            React__default['default'].createElement("div", { className: "lds-dual-ring" }),
            content ? React__default['default'].createElement("div", { className: "content" }, content) : null));
    };

    let icons = null;
    const reg = /.gitee-icon.([a-z0-9-_]+):before[\s\t]?\{[\n\s\t]+content:[\s\t]?[\'\"]([^\'\"]+)[\'\"]/igm;
    const extractIcons = (text) => {
        const _icons = {};
        reg.lastIndex = 0;
        let match = null;
        while ((match = reg.exec(text)) != null) {
            _icons[match[1]] = match[2].replace('\\', '');
        }
        return Object.keys(_icons).sort().reduce((obj, key) => {
            obj[key] = _icons[key];
            return obj;
        }, {});
    };
    const loadIcons = async (refresh = false) => {
        return new Promise(async (resolve) => {
            if (icons == null || refresh) {
                const res = await fetch('css/icons.css');
                const text = await res.text();
                icons = extractIcons(text);
                resolve(icons);
            }
            else {
                resolve(icons);
            }
        });
    };

    const App = () => {
        const [icons, setIcons] = React.useState(null);
        const [search, setSearch] = React.useState('');
        React.useEffect(() => {
            if (icons == null) {
                loadIcons().then(setIcons);
            }
        }, [icons]);
        const onChangeSearch = (e) => {
            setSearch(e.target.value);
        };
        return (React__default['default'].createElement(React__default['default'].Fragment, null,
            React__default['default'].createElement(Loader, { loading: icons == null, text: '提取图标中...' }),
            React__default['default'].createElement("div", { className: "header" },
                React__default['default'].createElement("input", { value: search, placeholder: '搜索码云图标', className: 'search-input', onChange: onChangeSearch })),
            React__default['default'].createElement("div", { className: "body" },
                React__default['default'].createElement(Icons, { search: search, icons: icons }))));
    };

    const appMount = () => {
        let container = document.getElementById('app_container');
        if (container == null) {
            container = document.createElement('div');
            container.setAttribute('id', 'app_container');
            container.className = 'app-container';
            ReactDOM__default['default'].render(React__default['default'].createElement(App, null), container);
            document.body.appendChild(container);
        }
    };
    window.onload = appMount;

})));
