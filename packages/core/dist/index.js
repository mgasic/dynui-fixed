import React, { forwardRef, useState, useImperativeHandle, useRef, createContext, useCallback, useEffect, useContext } from 'react';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';

// src/ui/dyn-tabs.tsx
function useArrowNavigation({
  orientation = "horizontal",
  loop = true,
  selector = '[role="tab"], [role="menuitem"], [role="option"]',
  onNavigate
} = {}) {
  const containerRef = useRef(null);
  const focusedIndexRef = useRef(-1);
  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    return Array.from(containerRef.current.querySelectorAll(selector));
  }, [selector]);
  const focusElement = useCallback((index) => {
    const elements = getFocusableElements();
    if (index < 0 || index >= elements.length) return;
    const element = elements[index];
    if (element) {
      element.focus();
      focusedIndexRef.current = index;
      onNavigate?.(index, element);
    }
  }, [getFocusableElements, onNavigate]);
  const handleKeyDown = useCallback((event) => {
    const elements = getFocusableElements();
    if (elements.length === 0) return;
    const currentIndex = focusedIndexRef.current;
    let nextIndex = currentIndex;
    const isHorizontal = orientation === "horizontal" || orientation === "both";
    const isVertical = orientation === "vertical" || orientation === "both";
    switch (event.key) {
      case "ArrowRight":
        if (isHorizontal) {
          event.preventDefault();
          nextIndex = currentIndex + 1;
        }
        break;
      case "ArrowLeft":
        if (isHorizontal) {
          event.preventDefault();
          nextIndex = currentIndex - 1;
        }
        break;
      case "ArrowDown":
        if (isVertical) {
          event.preventDefault();
          nextIndex = currentIndex + 1;
        }
        break;
      case "ArrowUp":
        if (isVertical) {
          event.preventDefault();
          nextIndex = currentIndex - 1;
        }
        break;
      case "Home":
        event.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        event.preventDefault();
        nextIndex = elements.length - 1;
        break;
      default:
        return;
    }
    if (loop) {
      if (nextIndex >= elements.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = elements.length - 1;
    } else {
      nextIndex = Math.max(0, Math.min(nextIndex, elements.length - 1));
    }
    focusElement(nextIndex);
  }, [getFocusableElements, focusElement, orientation, loop]);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
  const getFocusedIndex = useCallback(() => focusedIndexRef.current, []);
  const focusFirst = useCallback(() => {
    focusElement(0);
  }, [focusElement]);
  const focusLast = useCallback(() => {
    const elements = getFocusableElements();
    if (elements.length > 0) {
      focusElement(elements.length - 1);
    }
  }, [focusElement, getFocusableElements]);
  const focusIndex = useCallback(
    (index) => {
      focusElement(index);
    },
    [focusElement]
  );
  const setContainerRef = useCallback((node) => {
    containerRef.current = node;
  }, []);
  return {
    containerRef,
    focusElement,
    getFocusableElements,
    getFocusedIndex,
    focusFirst,
    focusLast,
    focusIndex,
    setContainerRef
  };
}

// src/utils/generate-initials.ts
function generateInitials(name) {
  if (!name?.trim()) return "??";
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
}

// src/utils/index.ts
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function getSpacingStyles({ p, m, gap }) {
  const styles = {};
  if (p !== void 0) styles.padding = typeof p === "number" ? `${p}px` : p;
  if (m !== void 0) styles.margin = typeof m === "number" ? `${m}px` : m;
  if (gap !== void 0) styles.gap = typeof gap === "number" ? `${gap}px` : gap;
  return styles;
}
var DynTabs = forwardRef(
  ({
    value,
    defaultValue,
    onChange,
    orientation = "horizontal",
    activation = "auto",
    children,
    className,
    "aria-label": ariaLabel,
    "data-testid": testId,
    ...props
  }, ref) => {
    const [internal, setInternal] = useState(defaultValue ?? "");
    const selected = value ?? internal;
    const setSelected = (next) => {
      if (value === void 0) setInternal(next);
      onChange?.(next);
    };
    const { getFocusedIndex, focusFirst, focusLast, focusIndex, setContainerRef } = useArrowNavigation({
      orientation,
      selector: '[role="tab"]:not([aria-disabled="true"])',
      loop: true
    });
    useImperativeHandle(ref, () => ({
      focusFirst: () => focusFirst(),
      focusLast: () => focusLast(),
      focus: (v) => {
        const items = getTabItems();
        const idx = items.findIndex((i) => i.value === v);
        if (idx >= 0) focusIndex(idx);
      },
      getFocused: () => {
        const idx = getFocusedIndex();
        const items = getTabItems();
        return idx >= 0 ? items[idx]?.value ?? null : null;
      },
      getSelected: () => selected ?? null
    }));
    const getTabItems = () => {
      const items = [];
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type === DynTab) {
          const { item } = child.props;
          if (item) items.push(item);
        }
      });
      return items;
    };
    const handleTabActivate = (tabValue) => setSelected(tabValue);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ...props,
        className: classNames("dyn-tabs", `dyn-tabs--${orientation}`, className),
        "data-testid": testId,
        "aria-label": ariaLabel,
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: (node) => {
                setContainerRef(node);
              },
              role: "tablist",
              "aria-orientation": orientation,
              className: "dyn-tabs__list",
              children: React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === DynTab) {
                  const item = child.props.item;
                  const isActive = item?.value === selected;
                  return React.cloneElement(child, {
                    isActive,
                    onSelect: handleTabActivate,
                    activation
                  });
                }
                return null;
              })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "dyn-tabs__content", children: React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === DynTabPanel) {
              const item = child.props.item;
              const isActive = item?.value === selected;
              return React.cloneElement(child, { isActive });
            }
            return null;
          }) })
        ]
      }
    );
  }
);
DynTabs.displayName = "DynTabs";
var DynTab = forwardRef(
  ({ item, isActive, onSelect, activation = "auto", disabled, className, ...props }, ref) => /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      ref,
      role: "tab",
      type: "button",
      "aria-selected": isActive,
      "aria-disabled": disabled,
      tabIndex: isActive ? 0 : -1,
      className: classNames(
        "dyn-tab",
        isActive && "dyn-tab--active",
        disabled && "dyn-tab--disabled",
        className
      ),
      onClick: () => !disabled && onSelect?.(item.value),
      onKeyDown: (e) => {
        if (activation === "manual" && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onSelect?.(item.value);
        } else if (activation === "auto" && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
        }
      },
      children: item?.label ?? props.children
    }
  )
);
DynTab.displayName = "DynTab";
var DynTabPanel = forwardRef(
  ({ item, isActive, className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ...props,
      ref,
      role: "tabpanel",
      hidden: !isActive,
      className: classNames("dyn-tab-panel", className),
      "aria-labelledby": item?.value,
      children: props.children
    }
  )
);
DynTabPanel.displayName = "DynTabPanel";

// src/ui/dyn-stepper.tsx
var DynStepper = () => null;
var DynStep = () => null;
var DynMenu = forwardRef(
  ({
    children,
    orientation = "vertical",
    onAction,
    className,
    "data-testid": testId,
    ...props
  }, ref) => {
    const handleAction = (key) => {
      onAction?.(key);
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ...props,
        ref,
        role: "menu",
        className: classNames("dyn-menu", `dyn-menu--${orientation}`, className),
        "data-testid": testId,
        children: React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === DynMenuItem) {
            return React.cloneElement(child, {
              onAction: handleAction,
              key: child.key || index
            });
          }
          return child;
        })
      }
    );
  }
);
DynMenu.displayName = "DynMenu";
var DynMenuItem = forwardRef(
  ({
    children,
    disabled = false,
    action,
    onAction,
    className,
    "data-testid": testId,
    ...props
  }, ref) => {
    const handleClick = () => {
      if (!disabled && action) {
        onAction?.(action);
      }
    };
    return /* @__PURE__ */ jsx(
      "button",
      {
        ...props,
        ref,
        role: "menuitem",
        disabled,
        className: classNames("dyn-menu-item", disabled && "dyn-menu-item--disabled", className),
        onClick: handleClick,
        "data-testid": testId,
        children
      }
    );
  }
);
DynMenuItem.displayName = "DynMenuItem";
var DynListView = forwardRef(
  ({
    items = [],
    selectedItem,
    onSelectionChange,
    multiSelect = false,
    className,
    "data-testid": testId,
    ...props
  }, ref) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const { containerRef } = useArrowNavigation({
      orientation: "vertical",
      selector: ".dyn-list-item:not(.dyn-list-item--disabled)"
    });
    const handleItemSelect = (itemId) => {
      if (multiSelect) {
        const newSelection = selectedItems.includes(itemId) ? selectedItems.filter((id) => id !== itemId) : [...selectedItems, itemId];
        setSelectedItems(newSelection);
        onSelectionChange?.(newSelection);
      } else {
        onSelectionChange?.([itemId]);
      }
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ...props,
        ref: ref || containerRef,
        role: "listbox",
        "aria-multiselectable": multiSelect,
        className: classNames("dyn-list-view", className),
        "data-testid": testId,
        children: items.map((item, index) => {
          const isSelected = multiSelect ? selectedItems.includes(item.id) : selectedItem === item.id;
          return /* @__PURE__ */ jsx(
            "div",
            {
              role: "option",
              "aria-selected": isSelected,
              tabIndex: 0,
              className: classNames(
                "dyn-list-item",
                isSelected && "dyn-list-item--selected",
                item.disabled && "dyn-list-item--disabled"
              ),
              onClick: () => !item.disabled && handleItemSelect(item.id),
              children: item.label
            },
            item.id || index
          );
        })
      }
    );
  }
);
DynListView.displayName = "DynListView";
function DynInput({
  as: As = "input",
  type = "text",
  id,
  name,
  value,
  defaultValue,
  disabled,
  required,
  placeholder,
  readonly,
  size = "md",
  variant = "outline",
  startIcon,
  endIcon,
  prefix,
  suffix,
  onChange,
  onFocus,
  onBlur,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  "aria-invalid": ariaInvalid,
  "data-testid": dataTestId,
  "data-state": dataState
}) {
  const cls = classNames(
    "dyn-input",
    `dyn-input--${size}`,
    `dyn-input--${variant}`,
    disabled && "dyn-input--disabled",
    readonly && "dyn-input--readonly"
  );
  return /* @__PURE__ */ jsxs("div", { className: classNames("dyn-input-wrapper", dataState && `dyn-input--${dataState}`), "data-testid": dataTestId, children: [
    startIcon && /* @__PURE__ */ jsx("div", { className: "dyn-input__start-icon", children: startIcon }),
    prefix && /* @__PURE__ */ jsx("div", { className: "dyn-input__prefix", children: prefix }),
    /* @__PURE__ */ jsx(
      As,
      {
        type,
        id,
        name,
        value,
        defaultValue,
        disabled,
        required,
        placeholder,
        readOnly: readonly,
        className: cls,
        onChange: (e) => onChange?.(e.target.value),
        onFocus,
        onBlur,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        "aria-describedby": ariaDescribedby,
        "aria-invalid": ariaInvalid
      }
    ),
    suffix && /* @__PURE__ */ jsx("div", { className: "dyn-input__suffix", children: suffix }),
    endIcon && /* @__PURE__ */ jsx("div", { className: "dyn-input__end-icon", children: endIcon })
  ] });
}
function DynButton({
  as: As = "button",
  children,
  variant = "solid",
  size = "md",
  color = "neutral",
  disabled,
  loading,
  onClick,
  onFocus,
  onBlur,
  startIcon,
  endIcon,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  "data-testid": dataTestId,
  "data-state": dataState
}) {
  const cls = classNames(
    "dyn-button",
    `dyn-button--${variant}`,
    `dyn-button--${size}`,
    `dyn-button--${color}`,
    disabled && "dyn-button--disabled",
    loading && "dyn-button--loading",
    dataState && `dyn-button--${dataState}`
  );
  return /* @__PURE__ */ jsxs(
    As,
    {
      className: cls,
      disabled: disabled || loading,
      onClick,
      onFocus,
      onBlur,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      "aria-describedby": ariaDescribedby,
      "data-testid": dataTestId,
      children: [
        startIcon && /* @__PURE__ */ jsx("span", { className: "dyn-button__start-icon", children: startIcon }),
        children,
        loading && /* @__PURE__ */ jsx("span", { className: "dyn-button__loader", "aria-hidden": "true", children: "Loading..." }),
        endIcon && /* @__PURE__ */ jsx("span", { className: "dyn-button__end-icon", children: endIcon })
      ]
    }
  );
}
function DynCheckbox({
  id,
  checked,
  defaultChecked,
  disabled,
  required,
  indeterminate,
  label,
  size = "md",
  onChange,
  onFocus,
  onBlur,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  "data-testid": dataTestId
}) {
  const cls = classNames(
    "dyn-checkbox",
    `dyn-checkbox--${size}`,
    disabled && "dyn-checkbox--disabled",
    indeterminate && "dyn-checkbox--indeterminate"
  );
  return /* @__PURE__ */ jsxs("div", { className: "dyn-checkbox-wrapper", "data-testid": dataTestId, children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "checkbox",
        id,
        checked,
        defaultChecked,
        disabled,
        required,
        className: cls,
        onChange: (e) => onChange?.(e.target.checked),
        onFocus,
        onBlur,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        "aria-describedby": ariaDescribedby
      }
    ),
    label && /* @__PURE__ */ jsx("label", { htmlFor: id, className: "dyn-checkbox__label", children: label })
  ] });
}
function useControlled(options) {
  const { value, defaultValue, onChange } = options;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== void 0;
  const currentValue = isControlled ? value : internalValue;
  const setValue = useCallback(
    (newValue) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange]
  );
  return {
    value: currentValue,
    setValue,
    isControlled
  };
}
function useKeyboard(key, callback, { enabled = true, preventDefault = false, stopPropagation = false } = {}) {
  const handleKeyPress = useCallback(
    (event) => {
      const keys = Array.isArray(key) ? key : [key];
      if (!keys.includes(event.key)) return;
      if (preventDefault) event.preventDefault();
      if (stopPropagation) event.stopPropagation();
      callback(event);
    },
    [key, callback, preventDefault, stopPropagation]
  );
  useEffect(() => {
    if (!enabled) return;
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [enabled, handleKeyPress]);
}
var DynSelect = forwardRef(
  ({
    id,
    name,
    value,
    defaultValue,
    onChange,
    disabled = false,
    required = false,
    placeholder,
    size = "md",
    variant = "outline",
    multiple = false,
    searchable = false,
    options,
    children,
    open: controlledOpen,
    onOpenChange,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
    "data-testid": dataTestId,
    "data-state": dataState
  }, ref) => {
    const triggerRef = useRef(null);
    const listboxRef = useRef(null);
    const { value: currentValue, setValue } = useControlled({
      value: multiple ? value : value,
      defaultValue: multiple ? defaultValue : defaultValue,
      onChange
    });
    const { value: isOpen, setValue: setIsOpen } = useControlled({
      value: controlledOpen,
      defaultValue: false,
      onChange: onOpenChange
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const processedOptions = options || [];
    const filteredOptions = searchable ? processedOptions.filter(
      (opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase())
    ) : processedOptions;
    useImperativeHandle(ref, () => ({
      focus: () => triggerRef.current?.focus(),
      blur: () => triggerRef.current?.blur(),
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      clear: () => setValue(multiple ? [] : "")
    }));
    useKeyboard("Escape", () => {
      if (isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }, { enabled: isOpen });
    useKeyboard("ArrowDown", (e) => {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setFocusedIndex(
          (prev) => prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
      }
    });
    useKeyboard("ArrowUp", (e) => {
      e.preventDefault();
      if (isOpen) {
        setFocusedIndex(
          (prev) => prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
      }
    });
    useKeyboard("Enter", (e) => {
      if (isOpen && focusedIndex >= 0) {
        e.preventDefault();
        const option = filteredOptions[focusedIndex];
        handleOptionSelect(option.value);
      }
    });
    const handleOptionSelect = (optionValue) => {
      if (multiple) {
        const currentArray = Array.isArray(currentValue) ? currentValue : [];
        const newValue = currentArray.includes(optionValue) ? currentArray.filter((v) => v !== optionValue) : [...currentArray, optionValue];
        setValue(newValue);
      } else {
        setValue(optionValue);
        setIsOpen(false);
      }
    };
    const handleTriggerClick = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };
    const getDisplayValue = () => {
      if (multiple && Array.isArray(currentValue)) {
        const selected = processedOptions.filter((opt) => currentValue.includes(opt.value));
        return selected.length > 0 ? `${selected.length} selected` : placeholder || "Select options...";
      } else {
        const selected = processedOptions.find((opt) => opt.value === currentValue);
        return selected?.label || placeholder || "Select option...";
      }
    };
    const wrapperClasses = classNames(
      "dyn-select-wrapper",
      dataState && `dyn-select-wrapper--${dataState}`
    );
    const triggerClasses = classNames(
      "dyn-select-trigger",
      `dyn-select-trigger--${size}`,
      `dyn-select-trigger--${variant}`,
      disabled && "dyn-select-trigger--disabled",
      isOpen && "dyn-select-trigger--open"
    );
    const listboxClasses = classNames(
      "dyn-select-listbox",
      isOpen && "dyn-select-listbox--open"
    );
    return /* @__PURE__ */ jsxs("div", { className: wrapperClasses, "data-testid": dataTestId, children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          ref: triggerRef,
          type: "button",
          id,
          disabled,
          required,
          className: triggerClasses,
          onClick: handleTriggerClick,
          "aria-label": ariaLabel,
          "aria-labelledby": ariaLabelledby,
          "aria-describedby": ariaDescribedby,
          "aria-expanded": isOpen,
          "aria-haspopup": "listbox",
          "aria-invalid": dataState === "error" ? "true" : void 0,
          children: [
            getDisplayValue(),
            /* @__PURE__ */ jsx("span", { className: "dyn-select-trigger__icon", "aria-hidden": "true", children: "\u25BC" })
          ]
        }
      ),
      isOpen && /* @__PURE__ */ jsxs("div", { className: "dyn-select-dropdown", children: [
        searchable && /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            className: "dyn-select-search",
            placeholder: "Search...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            autoFocus: true
          }
        ),
        /* @__PURE__ */ jsxs(
          "ul",
          {
            ref: listboxRef,
            className: listboxClasses,
            role: "listbox",
            "aria-multiselectable": multiple,
            children: [
              filteredOptions.map((option, index) => {
                const isSelected = multiple ? Array.isArray(currentValue) && currentValue.includes(option.value) : currentValue === option.value;
                const isFocused = index === focusedIndex;
                return /* @__PURE__ */ jsxs(
                  "li",
                  {
                    role: "option",
                    className: classNames(
                      "dyn-select-option",
                      isSelected && "dyn-select-option--selected",
                      isFocused && "dyn-select-option--focused",
                      option.disabled && "dyn-select-option--disabled"
                    ),
                    "aria-selected": isSelected,
                    "aria-disabled": option.disabled,
                    onClick: () => !option.disabled && handleOptionSelect(option.value),
                    children: [
                      option.label,
                      option.description && /* @__PURE__ */ jsx("span", { className: "dyn-select-option__description", children: option.description })
                    ]
                  },
                  option.value
                );
              }),
              filteredOptions.length === 0 && /* @__PURE__ */ jsx("li", { className: "dyn-select-option dyn-select-option--empty", children: "No options found" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "hidden",
          name,
          value: multiple ? JSON.stringify(currentValue) : currentValue || ""
        }
      )
    ] });
  }
);
DynSelect.displayName = "DynSelect";
function DynSelectOption({
  value,
  disabled = false,
  children,
  description
}) {
  return null;
}
DynSelectOption.displayName = "DynSelectOption";
var DynTextArea = forwardRef(
  ({
    id,
    name,
    value,
    defaultValue,
    onChange,
    disabled = false,
    required = false,
    readonly = false,
    placeholder,
    rows = 3,
    cols,
    resize = "vertical",
    size = "md",
    variant = "outline",
    onFocus,
    onBlur,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
    "data-testid": dataTestId,
    "data-state": dataState
  }, ref) => {
    const { value: currentValue, setValue } = useControlled({ value, defaultValue, onChange });
    const textareaClasses = classNames(
      "dyn-textarea",
      `dyn-textarea--${size}`,
      `dyn-textarea--${variant}`,
      `dyn-textarea--resize-${resize}`,
      disabled && "dyn-textarea--disabled",
      readonly && "dyn-textarea--readonly",
      required && "dyn-textarea--required"
    );
    const wrapperClasses = classNames(
      "dyn-textarea-wrapper",
      dataState && `dyn-textarea-wrapper--${dataState}`
    );
    return /* @__PURE__ */ jsx("div", { className: wrapperClasses, "data-testid": dataTestId, children: /* @__PURE__ */ jsx(
      "textarea",
      {
        ref,
        id,
        name,
        value: currentValue ?? "",
        placeholder,
        rows,
        cols,
        disabled,
        required,
        readOnly: readonly,
        className: textareaClasses,
        onChange: (e) => setValue(e.target.value),
        onFocus,
        onBlur,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        "aria-describedby": ariaDescribedby,
        "aria-invalid": dataState === "error" ? "true" : void 0
      }
    ) });
  }
);
DynTextArea.displayName = "DynTextArea";
var DynRadio = forwardRef(
  ({
    value,
    name,
    checked,
    defaultChecked,
    disabled = false,
    children,
    className,
    onChange,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    "data-testid": testId,
    size,
    ...props
  }, ref) => {
    const handleChange = (event) => {
      if (disabled) return;
      onChange?.(event.target.value, event);
    };
    const { size: _, ...inputProps } = props;
    return /* @__PURE__ */ jsxs(
      "label",
      {
        className: classNames(
          "dyn-radio",
          size && `dyn-radio--${size}`,
          disabled && "dyn-radio--disabled",
          className
        ),
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              ...inputProps,
              ref,
              type: "radio",
              value,
              name,
              checked,
              defaultChecked,
              disabled,
              onChange: handleChange,
              "aria-label": ariaLabel,
              "aria-labelledby": ariaLabelledBy,
              "aria-describedby": ariaDescribedBy,
              "data-testid": testId,
              className: "dyn-radio__input"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "dyn-radio__indicator" }),
          children && /* @__PURE__ */ jsx("span", { className: "dyn-radio__label", children })
        ]
      }
    );
  }
);
DynRadio.displayName = "DynRadio";
var DynRadioGroup = forwardRef(
  ({
    value,
    defaultValue,
    name,
    disabled = false,
    orientation = "vertical",
    children,
    className,
    onChange,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    "data-testid": testId,
    ...props
  }, ref) => {
    const { containerRef } = useArrowNavigation({
      orientation,
      selector: 'input[type="radio"]:not(:disabled)'
    });
    const handleChange = (selectedValue, event) => {
      if (disabled) return;
      onChange?.(selectedValue, event);
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ...props,
        ref: ref || containerRef,
        role: "radiogroup",
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-describedby": ariaDescribedBy,
        "data-testid": testId,
        className: classNames(
          "dyn-radio-group",
          `dyn-radio-group--${orientation}`,
          disabled && "dyn-radio-group--disabled",
          className
        ),
        children: React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === DynRadio) {
            const childProps = {
              ...child.props,
              name: name || `radio-group-${Math.random().toString(36).substr(2, 9)}`,
              checked: value !== void 0 ? child.props.value === value : void 0,
              defaultChecked: defaultValue !== void 0 ? child.props.value === defaultValue : void 0,
              disabled: disabled || child.props.disabled || void 0,
              onChange: handleChange,
              key: child.props.value || index
            };
            return React.cloneElement(child, childProps);
          }
          return child;
        })
      }
    );
  }
);
DynRadioGroup.displayName = "DynRadioGroup";
function DynAvatar({
  children,
  variant = "solid",
  size = "md",
  color = "neutral",
  src,
  alt,
  "aria-label": ariaLabel,
  "data-testid": dataTestId
}) {
  const cls = classNames(
    "dyn-avatar",
    `dyn-avatar--${variant}`,
    `dyn-avatar--${size}`,
    `dyn-avatar--${color}`
  );
  const content = src ? /* @__PURE__ */ jsx("img", { src, alt: alt || "", className: "dyn-avatar__image" }) : children ? typeof children === "string" ? generateInitials(children) : children : null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cls,
      role: "img",
      "aria-label": ariaLabel || alt,
      "data-testid": dataTestId,
      children: content
    }
  );
}
function DynBadge({
  children,
  variant = "solid",
  size = "md",
  color = "neutral",
  "aria-label": ariaLabel,
  "data-testid": dataTestId
}) {
  const cls = classNames(
    "dyn-badge",
    `dyn-badge--${variant}`,
    `dyn-badge--${size}`,
    `dyn-badge--${color}`
  );
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cls,
      "aria-label": ariaLabel,
      "data-testid": dataTestId,
      children
    }
  );
}
var DynTable = forwardRef(
  ({
    columns,
    data,
    sortable = false,
    onSort,
    className,
    "data-testid": testId,
    ...props
  }, ref) => {
    const [sortState, setSortState] = useState(null);
    const handleSort = (columnKey) => {
      if (!sortable || !onSort) return;
      const newDirection = sortState?.column === columnKey && sortState.direction === "asc" ? "desc" : "asc";
      const newSortState = { column: columnKey, direction: newDirection };
      setSortState(newSortState);
      onSort(columnKey, newDirection);
    };
    const getAriaSort = (columnKey) => {
      if (sortState?.column !== columnKey) return "none";
      return sortState.direction === "asc" ? "ascending" : "descending";
    };
    const { containerRef } = useArrowNavigation({
      orientation: "vertical",
      selector: 'tbody tr[tabindex="0"]'
    });
    return /* @__PURE__ */ jsx("div", { ref: containerRef, className: classNames("dyn-table-container", className), children: /* @__PURE__ */ jsxs(
      "table",
      {
        ...props,
        ref,
        className: "dyn-table",
        "data-testid": testId,
        role: "table",
        children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { role: "row", children: columns.map((column) => /* @__PURE__ */ jsxs(
            "th",
            {
              role: "columnheader",
              "aria-sort": getAriaSort(column.key),
              className: classNames(
                "dyn-table__header",
                sortable && column.sortable && "dyn-table__header--sortable"
              ),
              onClick: sortable && column.sortable ? () => handleSort(column.key) : void 0,
              tabIndex: sortable && column.sortable ? 0 : -1,
              onKeyDown: (e) => {
                if ((e.key === "Enter" || e.key === " ") && sortable && column.sortable) {
                  e.preventDefault();
                  handleSort(column.key);
                }
              },
              children: [
                column.label,
                sortable && column.sortable && sortState?.column === column.key && /* @__PURE__ */ jsx("span", { className: "dyn-table__sort-indicator", children: sortState.direction === "asc" ? "\u2191" : "\u2193" })
              ]
            },
            column.key
          )) }) }),
          /* @__PURE__ */ jsx("tbody", { children: data.map((row, rowIndex) => /* @__PURE__ */ jsx(
            "tr",
            {
              role: "row",
              tabIndex: 0,
              className: "dyn-table__row",
              children: columns.map((column) => /* @__PURE__ */ jsx(
                "td",
                {
                  role: "cell",
                  className: "dyn-table__cell",
                  children: row[column.key]
                },
                column.key
              ))
            },
            rowIndex
          )) })
        ]
      }
    ) });
  }
);
DynTable.displayName = "DynTable";

// src/ui/dyn-icon.tsx
var DynIcon = () => null;
function DynBox({
  as: As = "div",
  children,
  p,
  m,
  gap,
  className,
  "data-testid": dataTestId,
  ...props
}) {
  const cls = classNames("dyn-box", className);
  const styles = getSpacingStyles({ p, m, gap });
  return /* @__PURE__ */ jsx(
    As,
    {
      className: cls,
      style: styles,
      "data-testid": dataTestId,
      ...props,
      children
    }
  );
}
function DynContainer({
  as: As = "div",
  children,
  maxWidth = "lg",
  centered = true,
  fluid = false,
  className,
  "data-testid": dataTestId,
  ...props
}) {
  const cls = classNames(
    "dyn-container",
    !fluid && `dyn-container--max-${maxWidth}`,
    centered && "dyn-container--centered",
    fluid && "dyn-container--fluid",
    className
  );
  return /* @__PURE__ */ jsx(
    As,
    {
      className: cls,
      "data-testid": dataTestId,
      ...props,
      children
    }
  );
}
var DynGrid = forwardRef(
  ({
    columns,
    rows,
    gap,
    children,
    className,
    style,
    "data-testid": testId,
    ...props
  }, ref) => {
    const spacingArgs = {};
    if (gap !== void 0) spacingArgs.gap = gap;
    const spacingStyles = getSpacingStyles(spacingArgs);
    const combinedStyle = {
      ...spacingStyles,
      gridTemplateColumns: columns ? typeof columns === "number" ? `repeat(${columns}, 1fr)` : columns : void 0,
      gridTemplateRows: rows && Number(rows) > 0 ? typeof rows === "number" ? `repeat(${rows}, 1fr)` : rows : void 0,
      ...style
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ...props,
        ref,
        className: classNames(
          "dyn-grid",
          columns && Number(columns) > 0 && `dyn-grid--columns-${columns}`,
          rows && Number(rows) > 0 && `dyn-grid--rows-${rows}`,
          className
        ),
        style: combinedStyle,
        "data-testid": testId,
        children
      }
    );
  }
);
DynGrid.displayName = "DynGrid";
var DynGridItem = forwardRef(
  ({
    colSpan,
    rowSpan,
    children,
    className,
    "data-testid": testId,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ...props,
        ref,
        className: classNames(
          "dyn-grid-item",
          colSpan && Number(colSpan) > 0 && `dyn-grid-item--col-span-${colSpan}`,
          rowSpan && Number(rowSpan) > 0 && `dyn-grid-item--row-span-${rowSpan}`,
          className
        ),
        style: {
          gridColumn: colSpan && Number(colSpan) > 0 ? `span ${colSpan}` : void 0,
          gridRow: rowSpan && Number(rowSpan) > 0 ? `span ${rowSpan}` : void 0
        },
        "data-testid": testId,
        children
      }
    );
  }
);
DynGridItem.displayName = "DynGridItem";
var DynFieldContainer = ({ children }) => /* @__PURE__ */ jsx(Fragment, { children });
function DynDivider({
  orientation = "horizontal",
  variant = "solid",
  size = "md",
  label,
  "aria-label": ariaLabel,
  "data-testid": dataTestId
}) {
  const cls = classNames(
    "dyn-divider",
    `dyn-divider--${orientation}`,
    `dyn-divider--${variant}`,
    `dyn-divider--${size}`,
    label && "dyn-divider--with-label"
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cls,
      role: "separator",
      "aria-orientation": orientation,
      "aria-label": ariaLabel,
      "data-testid": dataTestId,
      children: label && /* @__PURE__ */ jsx("span", { className: "dyn-divider__label", children: label })
    }
  );
}
var FOCUSABLE_SELECTOR = [
  "button:not([disabled])",
  "[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(", ");
function useFocusTrap({
  enabled = true,
  initialFocus = true,
  returnFocus = true
} = {}) {
  const containerRef = useRef(null);
  const previousFocusRef = useRef(null);
  useEffect(() => {
    if (!enabled || !containerRef.current) return;
    const container = containerRef.current;
    previousFocusRef.current = document.activeElement;
    const focusableElements = container.querySelectorAll(FOCUSABLE_SELECTOR);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    if (initialFocus && firstFocusable) {
      firstFocusable.focus();
    }
    const handleKeyDown = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };
    container.addEventListener("keydown", handleKeyDown);
    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      if (returnFocus && previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [enabled, initialFocus, returnFocus]);
  return containerRef;
}
function useDropdown({
  closeOnClickOutside = true,
  closeOnEscape = true
} = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event) => {
      if (!closeOnClickOutside) return;
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        close();
      }
    };
    const handleEscape = (event) => {
      if (!closeOnEscape) return;
      if (event.key === "Escape") {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, close, closeOnClickOutside, closeOnEscape]);
  return {
    isOpen,
    open,
    close,
    toggle,
    containerRef
  };
}
function useTooltip({
  placement = "top",
  delay = 500,
  hideDelay = 0
} = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, placement });
  const triggerRef = useRef(null);
  const timeoutRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    let x = 0;
    let y = 0;
    switch (placement) {
      case "top":
        x = rect.left + rect.width / 2 + scrollX;
        y = rect.top + scrollY;
        break;
      case "bottom":
        x = rect.left + rect.width / 2 + scrollX;
        y = rect.bottom + scrollY;
        break;
      case "left":
        x = rect.left + scrollX;
        y = rect.top + rect.height / 2 + scrollY;
        break;
      case "right":
        x = rect.right + scrollX;
        y = rect.top + rect.height / 2 + scrollY;
        break;
    }
    setPosition({ x, y, placement });
  }, [placement]);
  const show = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      calculatePosition();
      setIsVisible(true);
    }, delay);
  }, [calculatePosition, delay]);
  const hide = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (hideDelay > 0) {
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        hideTimeoutRef.current = null;
      }, hideDelay);
    } else {
      setIsVisible(false);
    }
  }, [hideDelay]);
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    };
  }, []);
  return {
    isVisible,
    position,
    show,
    hide,
    triggerRef
  };
}
function DynModal({
  children,
  isOpen,
  onClose,
  size = "md",
  closeOnBackdropClick = true,
  closeOnEscape = true,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  "data-testid": dataTestId
}) {
  const focusTrapRef = useFocusTrap({
    enabled: isOpen,
    returnFocus: true
  });
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeOnEscape, onClose]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  if (!isOpen) return null;
  const backdropCls = classNames("dyn-modal__backdrop");
  const modalCls = classNames(
    "dyn-modal",
    `dyn-modal--${size}`
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: backdropCls,
      onClick: closeOnBackdropClick ? onClose : void 0,
      "data-testid": dataTestId,
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ref: focusTrapRef,
          className: modalCls,
          role: "dialog",
          "aria-modal": "true",
          "aria-label": ariaLabel,
          "aria-labelledby": ariaLabelledby,
          "aria-describedby": ariaDescribedby,
          onClick: (e) => e.stopPropagation(),
          children
        }
      )
    }
  );
}
function DynBreadcrumb({
  children,
  separator = "/",
  size = "md",
  "aria-label": ariaLabel = "Breadcrumb",
  "data-testid": dataTestId
}) {
  const cls = classNames(
    "dyn-breadcrumb",
    `dyn-breadcrumb--${size}`
  );
  return /* @__PURE__ */ jsx(
    "nav",
    {
      className: cls,
      "aria-label": ariaLabel,
      "data-testid": dataTestId,
      children: /* @__PURE__ */ jsx("ol", { className: "dyn-breadcrumb__list", children: Array.isArray(children) ? children.map((child, index) => /* @__PURE__ */ jsxs("li", { className: "dyn-breadcrumb__item", children: [
        child,
        index < children.length - 1 && /* @__PURE__ */ jsx("span", { className: "dyn-breadcrumb__separator", "aria-hidden": "true", children: separator })
      ] }, index)) : /* @__PURE__ */ jsx("li", { className: "dyn-breadcrumb__item", children }) })
    }
  );
}
function DynBreadcrumbItem({
  as: As = "span",
  children,
  href,
  current = false,
  disabled = false,
  onClick,
  "aria-current": ariaCurrent,
  "data-testid": dataTestId
}) {
  const cls = classNames(
    "dyn-breadcrumb-item",
    current && "dyn-breadcrumb-item--current",
    disabled && "dyn-breadcrumb-item--disabled"
  );
  const Component = href ? "a" : As;
  return /* @__PURE__ */ jsx(
    Component,
    {
      className: cls,
      href,
      onClick,
      "aria-current": current ? ariaCurrent || "page" : void 0,
      "data-testid": dataTestId,
      children
    }
  );
}
var DynTreeView = forwardRef(
  ({
    data = [],
    selectedNode,
    expandedNodes = [],
    onNodeSelect,
    onNodeExpand,
    multiSelect = false,
    className,
    "data-testid": testId,
    ...props
  }, ref) => {
    const [internalExpanded, setInternalExpanded] = useState(expandedNodes);
    const [internalSelected, setInternalSelected] = useState([]);
    const handleToggle = (nodeId) => {
      const newExpanded = internalExpanded.includes(nodeId) ? internalExpanded.filter((id) => id !== nodeId) : [...internalExpanded, nodeId];
      setInternalExpanded(newExpanded);
      onNodeExpand?.(nodeId);
    };
    const handleSelect = (nodeId) => {
      if (multiSelect) {
        const newSelected = internalSelected.includes(nodeId) ? internalSelected.filter((id) => id !== nodeId) : [...internalSelected, nodeId];
        setInternalSelected(newSelected);
      }
      onNodeSelect?.(nodeId);
    };
    const renderNode = (node, level = 0) => {
      const isExpanded = internalExpanded.includes(node.id);
      const isSelected = multiSelect ? internalSelected.includes(node.id) : selectedNode === node.id;
      const hasChildren = node.children && node.children.length > 0;
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          DynTreeNode,
          {
            node,
            level,
            expanded: isExpanded,
            selected: isSelected,
            hasChildren: hasChildren || void 0,
            onToggle: hasChildren ? () => handleToggle(node.id) : void 0,
            onSelect: () => handleSelect(node.id)
          }
        ),
        isExpanded && hasChildren && /* @__PURE__ */ jsx("div", { className: "dyn-tree-view__children", children: node.children?.map((childNode) => renderNode(childNode, level + 1)) })
      ] }, node.id);
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ...props,
        ref,
        role: "tree",
        className: classNames("dyn-tree-view", className),
        "data-testid": testId,
        children: data.map((node) => renderNode(node))
      }
    );
  }
);
DynTreeView.displayName = "DynTreeView";
var DynTreeNode = forwardRef(
  ({
    node,
    level = 0,
    expanded,
    selected,
    hasChildren,
    onToggle,
    onSelect,
    className,
    ...props
  }, ref) => {
    if (!node) return null;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ...props,
        ref,
        role: "treeitem",
        "aria-expanded": hasChildren ? expanded : void 0,
        "aria-selected": selected,
        "aria-level": level + 1,
        tabIndex: 0,
        className: classNames(
          "dyn-tree-node",
          selected && "dyn-tree-node--selected",
          hasChildren && "dyn-tree-node--expandable",
          className
        ),
        style: { paddingLeft: `${level * 20}px` },
        onClick: onSelect,
        children: [
          hasChildren && /* @__PURE__ */ jsx(
            "button",
            {
              className: "dyn-tree-node__toggle",
              onClick: (e) => {
                e.stopPropagation();
                onToggle?.();
              },
              "aria-label": expanded ? "Collapse" : "Expand",
              children: expanded ? "\u25BC" : "\u25B6"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "dyn-tree-node__label", children: node.label })
        ]
      }
    );
  }
);
DynTreeNode.displayName = "DynTreeNode";

// src/theme/default-theme.ts
var defaultTheme = {
  colors: {
    primary: {
      50: "#eff6ff",
      100: "#dbeafe",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      900: "#1e3a8a"
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827"
    },
    danger: {
      50: "#fef2f2",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c"
    },
    success: {
      50: "#f0fdf4",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d"
    },
    warning: {
      50: "#fffbeb",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309"
    }
  },
  spacing: {
    xs: "0.25rem",
    // 4px
    sm: "0.5rem",
    // 8px
    md: "1rem",
    // 16px
    lg: "1.5rem",
    // 24px
    xl: "2rem",
    // 32px
    "2xl": "3rem"
    // 48px
  },
  typography: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
      mono: ["Fira Code", "Monaco", "monospace"]
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }]
    }
  },
  borderRadius: {
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    full: "9999px"
  },
  shadow: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)"
  }
};
var ThemeContext = createContext(void 0);
function ThemeProvider({ children, initialTheme = defaultTheme }) {
  const [theme, setTheme] = useState(initialTheme);
  const value = {
    theme,
    setTheme
  };
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value, children });
}
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// src/index.ts
var DYNUI_VERSION = "1.0.0";

export { DYNUI_VERSION, DynAvatar, DynBadge, DynBox, DynBreadcrumb, DynBreadcrumbItem, DynButton, DynCheckbox, DynContainer, DynDivider, DynFieldContainer, DynGrid, DynGridItem, DynIcon, DynInput, DynListView, DynMenu, DynMenuItem, DynModal, DynRadio, DynRadioGroup, DynSelect, DynSelectOption, DynStep, DynStepper, DynTab, DynTabPanel, DynTable, DynTabs, DynTextArea, DynTreeNode, DynTreeView, ThemeContext, ThemeProvider, classNames, defaultTheme, getSpacingStyles, useArrowNavigation, useControlled, useDropdown, useFocusTrap, useKeyboard, useTheme, useTooltip };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map