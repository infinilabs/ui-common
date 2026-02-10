import "./doc_viewer.scss";
import React from "react";
import { getDocViewsRegistry } from "../../../kibana_services";
import { DocViewerTab } from "./doc_viewer_tab";
import { DocView, DocViewRenderProps } from "../../doc_views/doc_views_types";
import { Tabs } from "antd";


export function DocViewer(renderProps: DocViewRenderProps & {
  filterIconRender?: (children: any, params: { field: any, values: any, operation: any }) => any;
}) {
  const docViewsRegistry = getDocViewsRegistry();
  
  const tabItems = docViewsRegistry
    .getDocViewsSorted(renderProps.hit)
    .map(({ title, render, component }: DocView, idx: number) => {
      return {
        key: `kbn_doc_viewer_tab_${idx}`, 
        label: title,                    
        children: (                     
          <DocViewerTab
            id={idx}
            title={title}
            component={component}
            renderProps={renderProps}
            render={render}
          />
        ),
      };
    });

  if (!tabItems.length) {
    return null;
  }

  return (
    <div className="kbnDocViewer">
      <Tabs 
        defaultActiveKey="kbn_doc_viewer_tab_0" 
        items={tabItems}
        classNames={{ header: '!mb-0'}} 
      />
    </div>
  );
}