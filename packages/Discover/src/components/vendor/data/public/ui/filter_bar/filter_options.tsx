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

import { Button, Menu, Popover } from 'antd';
import { Eye, EyeOff, ListFilter, Pin, PinOff, SquaresExclude, Trash2 } from 'lucide-react';
import { Component } from 'react';

interface Props {
  onEnableAll: () => void;
  onDisableAll: () => void;
  onPinAll: () => void;
  onUnpinAll: () => void;
  onToggleAllNegated: () => void;
  onToggleAllDisabled: () => void;
  onRemoveAll: () => void;
}

interface State {
  isPopoverOpen: boolean;
}

class FilterOptionsUI extends Component<Props, State> {
  public state: State = {
    isPopoverOpen: false,
  };

  public togglePopover = () => {
    this.setState((prevState) => ({
      isPopoverOpen: !prevState.isPopoverOpen,
    }));
  };

  public closePopover = () => {
    this.setState({ isPopoverOpen: false });
  };

  public render() {
    return (
      <Popover
        classNames={{
          container: "!p-0 !overflow-hidden",
          title: "!p-12px !uppercase !mb-0 !border-b-1px !border-b-solid !border-[var(--ant-color-border)]"
        }}
        placement="bottom"
        open={this.state.isPopoverOpen}
        onOpenChange={(open) => {
          this.setState({
            isPopoverOpen: open,
          });
        }}
        content={(
          <Menu
            onClick={() => { }}
            className="!border-0"
            classNames={{
              item: "!m-0 !px-12px !w-full !rounded-0"
            }}
            mode="vertical"
            items={[
              {
                key: 'enable',
                label: 'Enable all',
                icon: <Eye className="w-14px h-14px" />,
                onClick: () => {
                  this.closePopover();
                  this.props.onEnableAll();
                },
              },
              {
                key: 'disable',
                label: 'Disable all',
                icon: <EyeOff className="w-14px h-14px" />,
                onClick: () => {
                  this.closePopover();
                  this.props.onDisableAll();
                },
              },
              {
                key: 'pin',
                label: 'Pin all',
                icon: <Pin className="w-14px h-14px" />,
                onClick: () => {
                  this.closePopover();
                  this.props.onPinAll();
                },
              },
              {
                key: 'unpin',
                label: 'Unpin all',
                icon: <PinOff className="w-14px h-14px" />,
                onClick: () => {
                  this.closePopover();
                  this.props.onUnpinAll();
                },
              },
              {
                key: 'invert_inclusion',
                label: 'Invert inclusion',
                icon: <SquaresExclude className="w-14px h-14px" />,
                onClick: () => {
                  this.closePopover();
                  this.props.onToggleAllNegated();
                },
              },
              {
                key: 'invert_enabled_disabled',
                label: 'Invert enabled/disabled',
                icon: <Eye className="w-14px h-14px" />,
                onClick: () => {
                  this.closePopover();
                  this.props.onToggleAllDisabled();
                },
              },
              {
                key: 'remove_all',
                label: 'Remove all',
                icon: <Trash2 className="w-14px h-14px" />,
                onClick: () => {
                  this.closePopover();
                  this.props.onRemoveAll();
                },
              },
            ]}
          />
        )}
        title="Change all filters"
        trigger="click"
        destroyOnHidden
        arrow={false}
      >
        <Button icon={<ListFilter className="w-14px h-14px" />} />
      </Popover>
    )
  }
}

export const FilterOptions = (FilterOptionsUI);
