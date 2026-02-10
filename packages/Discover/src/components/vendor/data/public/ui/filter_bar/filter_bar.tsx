import classNames from "classnames";

import { FilterItem } from "./filter_item";
import { IIndexPattern } from "../..";
import {
  Filter,
} from "../../../common";
import { Flex } from "antd";

interface Props {
  filters: Filter[];
  onFiltersUpdated?: (filters: Filter[]) => void;
  className: string;
  indexPatterns: IIndexPattern[];
  intl: InjectedIntl;
}

function FilterBarUI(props: Props) {

  function onFiltersUpdated(filters: Filter[]) {
    if (props.onFiltersUpdated) {
      props.onFiltersUpdated(filters);
    }
  }

  function renderItems() {
    return props.filters.map((filter, i) => (
      <div key={i} className="globalFilterBar__flexItem" style={{ flex: '0 0 auto' }}>
        <FilterItem
          id={`${i}`}
          intl={props.intl}
          filter={filter}
          onUpdate={(newFilter) => onUpdate(i, newFilter)}
          onRemove={() => onRemove(i)}
          indexPatterns={props.indexPatterns}
          // uiSettings={uiSettings!}
          services={props.services}
          theme={props.theme}
        />
      </div>
    ));
  }

  function onRemove(i: number) {
    const filters = [...props.filters];
    filters.splice(i, 1);
    onFiltersUpdated(filters);
  }

  function onUpdate(i: number, filter: Filter) {
    const filters = [...props.filters];
    filters[i] = filter;
    onFiltersUpdated(filters);
  }

  const classes = classNames("globalFilterBar", props.className);

  return (
    <Flex
      className="globalFilterGroup"
      vertical={false} 
      align="flex-start" 
      gap={0}
    >
      <div className="globalFilterGroup__filterFlexItem" style={{ flex: 1 }}>
        <Flex
          className={classes}
          wrap="wrap" 
          gap={8} 
          align="center" 
        >
          {renderItems()}
        </Flex>
      </div>
    </Flex>
  );
}

export const FilterBar = FilterBarUI;
