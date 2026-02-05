import DropdownList from "@/common/src/DropdownList";
import { useMemo, useState } from "react";
import styles from "./index.module.less";
import { TableOutlined } from "@ant-design/icons";

export default (props) => {

    const { selectedIndexPattern, onIndexPatternChange, indices = [] } = props;
    
    const [sorter, setSorter] = useState([])
    const [filters, setFilters] = useState({ type: ['index', 'specialIndex']})

    const formatData = useMemo(() => {
      const formatIndices = indices?.map((item) => ({
        id: item,
        title: item,
        name: item,
        type: item.startsWith(".") ? 'specialIndex' : 'index',
      })) || []
      return formatIndices
    }, [indices])

    const filterOptions = useMemo(() => {
      return [{ 
        label: "Type", 
        key: "type", 
        list: [
          {
            label: "Index",
            value: 'index',
          },
          {
            label: "Special Index",
            value: 'specialIndex',
          },
        ]
      }]
    }, [])

    return (
        <DropdownList
          className={styles.indexPatternSelect}
          width={282}
          // locale={getLocale()}
          value={{
            id: selectedIndexPattern.id,
            name: selectedIndexPattern.viewName || selectedIndexPattern.title,
            type: selectedIndexPattern.type
          }}
          onChange={(item) => {
            onIndexPatternChange(item.id, item.type === 'view' ? 'view' : 'index')
          }}
          placeholder="Please select"
          rowKey="id"
          data={formatData}
          renderItem={(item) => (
            <>
              <TableOutlined className="mr-4px"/>
              {item.name}
            </>
          )}
          renderLabel={(item) => item.name}
          renderEmptyList={() => {
            return null
          }}
          searchKey="name"
          sorter={sorter}
          onSorterChange={setSorter}
          sorterOptions={[
            { label: "Name", key: "name" },
          ]}
          filters={filters}
          onFiltersChange={setFilters}
          filterOptions={filterOptions}
        />
    )
}