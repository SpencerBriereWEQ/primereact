'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HeaderCell = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputText = require('../inputtext/InputText');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _RowCheckbox = require('./RowCheckbox');

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _TableSortLabel = require('@material-ui/core/TableSortLabel');

var _TableSortLabel2 = _interopRequireDefault(_TableSortLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeaderCell = exports.HeaderCell = function (_Component) {
    _inherits(HeaderCell, _Component);

    function HeaderCell(props) {
        _classCallCheck(this, HeaderCell);

        var _this = _possibleConstructorReturn(this, (HeaderCell.__proto__ || Object.getPrototypeOf(HeaderCell)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        _this.onFilterInput = _this.onFilterInput.bind(_this);
        _this.onMouseDown = _this.onMouseDown.bind(_this);
        _this.onResizerMouseDown = _this.onResizerMouseDown.bind(_this);
        return _this;
    }

    _createClass(HeaderCell, [{
        key: 'onClick',
        value: function onClick(e) {
            if (this.props.sortable) {
                var targetNode = e.target;
                if (_DomHandler2.default.hasClass(targetNode, 'p-sortable-column') || _DomHandler2.default.hasClass(targetNode, 'p-column-title') || _DomHandler2.default.hasClass(targetNode, 'p-sortable-column-icon') || _DomHandler2.default.hasClass(targetNode.parentElement, 'p-sortable-column-icon')) {
                    this.props.onSort({
                        originalEvent: e,
                        sortField: this.props.field,
                        sortFunction: this.props.sortFunction,
                        sortable: this.props.sortable
                    });

                    _DomHandler2.default.clearSelection();
                }
            }
        }
    }, {
        key: 'onFilterInput',
        value: function onFilterInput(e) {
            var _this2 = this;

            if (this.props.filter && this.props.onFilter) {
                if (this.filterTimeout) {
                    clearTimeout(this.filterTimeout);
                }

                var filterValue = e.target.value;
                this.filterTimeout = setTimeout(function () {
                    _this2.props.onFilter({
                        value: filterValue,
                        field: _this2.props.field,
                        matchMode: _this2.props.filterMatchMode
                    });
                    _this2.filterTimeout = null;
                }, this.filterDelay);
            }
        }
    }, {
        key: 'onResizerMouseDown',
        value: function onResizerMouseDown(event) {
            if (this.props.resizableColumns && this.props.onColumnResizeStart) {
                this.props.onColumnResizeStart({
                    originalEvent: event,
                    columnEl: event.target.parentElement,
                    columnProps: this.props
                });
            }
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(event) {
            if (this.props.reorderableColumns) {
                if (event.target.nodeName !== 'INPUT') this.el.draggable = true;else if (event.target.nodeName === 'INPUT') this.el.draggable = false;
            }
        }
    }, {
        key: 'getMultiSortMetaData',
        value: function getMultiSortMetaData() {
            if (this.props.multiSortMeta) {
                for (var i = 0; i < this.props.multiSortMeta.length; i++) {
                    if (this.props.multiSortMeta[i].field === this.props.field) {
                        return this.props.multiSortMeta[i];
                    }
                }
            }

            return null;
        }
    }, {
        key: 'renderHeaderText',
        value: function renderHeaderText(sorted, sortOrder, label) {
            return _react2.default.createElement(
                _TableSortLabel2.default,
                {
                    className: 'p-sortable-column-icon',
                    active: sorted,
                    direction: sortOrder < 0 ? 'desc' : 'asc',
                    style: { pointerEvents: sorted ? "" : "none" }
                },
                label
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var multiSortMetaData = this.getMultiSortMetaData();
            var singleSorted = this.props.field === this.props.sortField;
            var multipleSorted = multiSortMetaData !== null;
            var sortOrder = 0;
            var resizer = this.props.resizableColumns && _react2.default.createElement('span', { className: 'p-column-resizer p-clickable', onMouseDown: this.onResizerMouseDown });
            var filterElement = void 0,
                headerCheckbox = void 0;

            if (singleSorted) sortOrder = this.props.sortOrder;else if (multipleSorted) sortOrder = multiSortMetaData.order;

            var sorted = this.props.sortable && (singleSorted || multipleSorted);
            var className = (0, _classnames2.default)({ 'p-sortable-column': this.props.sortable,
                'p-highlight': sorted,
                'p-resizable-column': this.props.resizableColumns,
                'p-selection-column': this.props.selectionMode }, this.props.headerClassName || this.props.className);

            var headerTextElement = this.renderHeaderText(sorted, sortOrder, this.props.header);

            if (this.props.filter) {
                filterElement = this.props.filterElement || _react2.default.createElement(_InputText.InputText, { onInput: this.onFilterInput, type: this.props.filterType, defaultValue: this.props.filters && this.props.filters[this.props.field] ? this.props.filters[this.props.field].value : null,
                    className: 'p-column-filter', placeholder: this.props.filterPlaceholder, maxLength: this.props.filterMaxLength });
            }

            if (this.props.selectionMode === 'multiple') {
                headerCheckbox = _react2.default.createElement(_RowCheckbox.RowCheckbox, { onClick: this.props.onHeaderCheckboxClick, selected: this.props.headerCheckboxSelected });
            }

            return _react2.default.createElement(
                'th',
                { ref: function ref(el) {
                        return _this3.el = el;
                    },
                    className: className, style: this.props.headerStyle || this.props.style, onClick: this.onClick, onMouseDown: this.onMouseDown,
                    colSpan: this.props.colSpan, rowSpan: this.props.rowSpan,
                    onDragStart: this.props.onDragStart, onDragOver: this.props.onDragOver, onDragLeave: this.props.onDragLeave, onDrop: this.props.onDrop },
                resizer,
                headerTextElement,
                filterElement,
                headerCheckbox
            );
        }
    }]);

    return HeaderCell;
}(_react.Component);