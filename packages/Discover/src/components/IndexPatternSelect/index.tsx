import DropdownList from "@/common/src/DropdownList";
import { useMemo, useState } from "react";
import styles from "./index.module.less";
import Icon, { TableOutlined } from "@ant-design/icons";
import { Tag } from "antd";

const AliasSvg = () => {
  return <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2259" width="1em" height="1em"><path d="M803.27111147 612.1244441H220.72888853v72.81777813h582.54222294v-72.81777813zM493.7955552 320.8533337c-29.12711147 0-54.61333333 25.48622187-54.61333333 54.61333333s25.48622187 54.61333333 54.61333333 54.61333333 54.61333333-25.48622187 54.61333333-54.61333333-25.48622187-54.61333333-54.61333333-54.61333333z" fill="currentColor" p-id="2260"></path><path d="M475.59111147 149.73155556l254.86222186 141.99466667V830.57777743H257.13777813V288.0853337l218.45333334-138.35377814M471.95022187 65.99111076L184.32 248.03555556v582.54222187c0 40.04977813 32.768 72.81777813 72.81777813 72.81777813h473.3155552c40.04977813 0 72.81777813-32.768 72.81777814-72.81777813V248.03555556l-331.3208896-182.0444448z" fill="currentColor" p-id="2261"></path></svg>
}

export default (props: any) => {

    const { locale, selectedIndexPattern, onIndexPatternChange, indices = [] } = props;
    
    const [sorter, setSorter] = useState([])
    const [filters, setFilters] = useState({ type: ['alias', 'index', 'specialIndex']})

    const getIcon = (type: string) => {
      if (type === 'index' || type === 'specialIndex') {
        return <TableOutlined className="mr-4px"/>
      } else if (type === 'alias') {
        return <Icon component={AliasSvg} className="mr-4px"/>
      }
      return
    }

    const formatType = (item: any) => {
      return item.type === 'index' ? (item.name?.startsWith(".") ? 'specialIndex' : 'index') : item.type
    }

    const formatData = useMemo(() => {
      const formatIndices = indices?.map((item: any) => ({
        title: item.name,
        name: item.name,
        type: formatType(item),
        tag: item.tag,
        _source: item,
      })) || []
      return formatIndices
    }, [indices])

    const filterOptions = useMemo(() => {
      return [{ 
        label: "Type", 
        key: "type", 
        list: [
          {
            label: "Alias",
            value: 'alias',
          },
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
          locale={locale}
          value={{
            name: selectedIndexPattern.viewName || selectedIndexPattern.title,
            type: formatType({
              name: selectedIndexPattern.viewName || selectedIndexPattern.title,
              type: selectedIndexPattern.type
            })
          }}
          onChange={(item) => {
            onIndexPatternChange(item.name, item.type)
          }}
          placeholder="Please select"
          rowKey="name"
          data={formatData}
          renderItem={(item) => (
            <>
              {getIcon(item.type)}
              {item.name}
            </>
          )}
          renderTag={(item) => (
            item.tag ? <Tag>{item.tag}</Tag> : null
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