/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { Component, Fragment, useContext } from "react";
import PropTypes from "prop-types";

import { Empty } from "antd";
import { GlobalConfigContext } from "@/components";

// eslint-disable-next-line react/prefer-stateless-function
export class DiscoverNoResultsUI extends Component {
  static propTypes = {
    timeFieldName: PropTypes.string,
  };

  render() {
    const { range, timeFieldName } = this.props;
    const i18nEmpty = this.props.i18n?.empty || {}

    const hasRange = range && (range[0] || range[1])

    let timeFieldMessage;

    if (timeFieldName && hasRange) {
      timeFieldMessage = (
        <Fragment>
          <h2>
            {i18nEmpty['title'] || "Try another query?"}
          </h2>

          <p>
            {i18nEmpty['desc'] || "Your query criteria do not match any data, try to modify the query or change the time range."} 
          </p>
        </Fragment>
      );
    }

    return (
      <div className="w-full min-h-0 flex-1 flex items-center justify-center">
        <Empty 
          image={Empty.PRESENTED_IMAGE_SIMPLE} 
          description={timeFieldMessage}
        />
      </div>
    );
  }
}

export function DiscoverNoResults(props){
  const { i18n } = useContext(GlobalConfigContext)
  return <DiscoverNoResultsUI {...props} i18n={i18n}/>
}
