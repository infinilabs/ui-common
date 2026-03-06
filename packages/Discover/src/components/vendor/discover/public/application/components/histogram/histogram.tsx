import moment from "moment-timezone";
import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import {
  Axis,
  Chart,
  HistogramBarSeries,
  Position,
  ScaleType,
  Settings,
  LIGHT_THEME,
  DARK_THEME,
  Tooltip,
} from "@elastic/charts";

import "./theme_light.css";

import { CurrentTime } from "./current_time";
import {
  Endzones,
  getAdjustedInterval,
} from "./endzones";

export class DiscoverHistogram extends Component {
  static propTypes = {
    chartData: PropTypes.object,
    timefilterUpdateHandler: PropTypes.func,
    theme: PropTypes.string,
    timeZone: PropTypes.string,
  };

  containerRef = createRef();
  tooltipCloseTimer = null;
  TOOLTIP_DELAY = 200;

  state = {
    tooltipVisible: false,
    tooltipPos: { x: 0, y: 0 },
    pointerEvent: null,
  };

  componentWillUnmount() {
    if (this.tooltipCloseTimer) {
      clearTimeout(this.tooltipCloseTimer);
    }
  }

  handleMouseMove = (e) => {
    if (!this.containerRef.current) return;
    const rect = this.containerRef.current.getBoundingClientRect();
    this.setState({
      tooltipPos: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    });
  };

  handlePointerUpdate = (event) => {
    const { chartData } = this.props;

    if (this.tooltipCloseTimer) {
      clearTimeout(this.tooltipCloseTimer);
    }

    if (event.type === 'Over' && event.x && chartData?.values) {
      const originalDatum = chartData.values.find(d => d.x === event.x);

      if (originalDatum) {
        const enrichedEvent = {
          ...event,
          yValue: originalDatum.y
        };

        this.setState({
          pointerEvent: enrichedEvent,
          tooltipVisible: true
        });
      } else {
        this.tooltipCloseTimer = setTimeout(() => {
          this.setState({ tooltipVisible: false });
        }, this.TOOLTIP_DELAY);
      }
    } else {
      this.tooltipCloseTimer = setTimeout(() => {
        this.setState({ tooltipVisible: false });
      }, this.TOOLTIP_DELAY);
    }
  };

  onBrushEnd = ({ x }) => {
    if (!x) return;
    const [from, to] = x;
    this.props.timefilterUpdateHandler({ from, to });
  };

  onElementClick = (xInterval) => ([elementData]) => {
    const startRange = elementData[0].x;

    const range = {
      from: startRange,
      to: startRange + xInterval,
    };

    this.props.timefilterUpdateHandler(range);
  };

  formatXValue = (val) => {
    return moment(val).format(this.props.chartData.xAxisFormat.params?.pattern);
  };

  renderCustomTooltip() {
    const { tooltipVisible, tooltipPos, pointerEvent } = this.state;
    if (!tooltipVisible || !pointerEvent) return null;

    const containerWidth = this.containerRef.current?.clientWidth || 0;
    const containerHeight = this.containerRef.current?.clientHeight || 0;
    const isTooRight = tooltipPos.x + 180 > containerWidth;
    const isTooBottom = tooltipPos.y + 80 > containerHeight;

    const translateX = isTooRight ? "-100% - 12px" : "12px";
    const translateY = isTooBottom ? "-100% - 12px" : "12px";

    return (
      <div
        className="absolute z-100 pointer-events-none p-2 rounded-md  
                   bg-white/98 shadow-[0_6px_16px_0_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12)] 
                   w-max min-w-100px dark:bg-[#1f1f1f]"
        style={{
          left: `${tooltipPos.x}px`,
          top: `${tooltipPos.y}px`,
          transform: `translate(calc(${translateX}), calc(${translateY}))`,
          transition: 'transform 0.1s cubic-bezier(0.23, 1, 0.32, 1)'
        }}
      >
        <div className="text-[12px] text-black/45 dark:text-white/45 mb-2 leading-none">
          {this.formatXValue(pointerEvent.x)}
        </div>

        <div className="flex justify-between items-center gap-8">
          <div className="flex items-center">
            <span className="text-[12px] text-black/85 dark:text-white/85">
              {this.props.chartData.yAxisLabel}
            </span>
          </div>

          <span className="text-[12px] font-600 text-black/85 dark:text-white/85">
            {pointerEvent.yValue?.toLocaleString()}
          </span>
        </div>
      </div>
    );
  }

  render() {
    const { timeZone, theme, chartData, height = 100 } = this.props;
    if (!chartData) return null;

    const data = chartData.values;
    const isDarkMode = theme === 'dark';
    const { interval } = chartData.ordered;
    const xInterval = interval.asMilliseconds();
    const domain = chartData.ordered;
    const domainStart = domain.min.valueOf();
    const domainEnd = domain.max.valueOf();

    const xDomain = {
      min: Math.min(data[0]?.x, domainStart),
      max: Math.max(domainEnd - xInterval, chartData.xAxisOrderedValues[chartData.xAxisOrderedValues.length - 1]),
      minInterval: getAdjustedInterval(chartData.xAxisOrderedValues, chartData.ordered.intervalESValue, chartData.ordered.intervalESUnit, timeZone),
    };

    const xAxisFormatter = {
      convert: (value) => {
        return value;
      },
    };

    const delayHideTooltip = () => {
      if (this.tooltipCloseTimer) {
        clearTimeout(this.tooltipCloseTimer);
      }
      this.tooltipCloseTimer = setTimeout(() => {
        this.setState({ tooltipVisible: false });
      }, this.TOOLTIP_DELAY);
    };

    return (
      <div
        ref={this.containerRef}
        className="relative w-full h-full"
        onMouseMove={this.handleMouseMove}
        onMouseLeave={delayHideTooltip}
      >
        {this.renderCustomTooltip(domainStart, domainEnd, xInterval)}

        <Chart size={{ height }}>
          <Settings
            xDomain={xDomain}
            onBrushEnd={this.onBrushEnd}
            onElementClick={this.onElementClick(xInterval)}
            theme={isDarkMode ? DARK_THEME : LIGHT_THEME}
            onPointerUpdate={this.handlePointerUpdate}
          />
          <Tooltip customTooltip={() => null} />
          <Axis
            id="discover-histogram-left-axis"
            position={Position.Left}
            ticks={5}
            title={chartData.yAxisLabel}
            integersOnly
            tickFormat={(value) => {
              return xAxisFormatter.convert(value);
            }}
            showGridLines
            hide={true}
          />
          <Axis
            id="discover-histogram-bottom-axis"
            position={Position.Bottom}
            // title={chartData.xAxisLabel}
            tickFormat={this.formatXValue}
            ticks={10}
            //showGridLines
            hide={true}
          />
          <CurrentTime isDarkMode={isDarkMode} domainEnd={domainEnd} />
          <Endzones
            isDarkMode={isDarkMode}
            domainStart={domainStart}
            domainEnd={domainEnd}
            interval={xDomain.minInterval}
            domainMin={xDomain.min}
            domainMax={xDomain.max}
          />
          <HistogramBarSeries
            id="discover-histogram"
            minBarHeight={2}
            xScaleType={ScaleType.Time}
            yScaleType={ScaleType.Linear}
            xAccessor="x"
            yAccessors={["y"]}
            data={data}
            timeZone={timeZone}
            name={chartData.yAxisLabel}
          />
        </Chart>
      </div>
    );
  }
}