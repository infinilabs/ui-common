export const data = {
  type: "user",
  id: "user-demo",
  style: {
    width: "376px",
    height: "",
    max_width: "376px",
    max_height: "500px",
    cover_max_height: "172px",
  },
  color: "#0f0f0f",
  icon: "user",
  title: "示例用户",
  subtitle: "示例职位@示例部门",
  url: "mailto:user@example.com",
  cover: "https://picsum.photos/640/360",
  categories: ["示例组织", "示例部门", "示例小组"],
  tags: ["示例标签A", "示例标签B"],
  properties: [
    { icon: "email", value: "user@example.com" },
    { icon: "phone", value: "139****0000" },
    {
      icon: "datetime",
      value: "2025-08-21T15:34:25Z",
      view: "datetime_with_time_zone",
      payload: {},
    },
    {
      icon: "tags",
      value: ["北京", "示例标签"],
      view: "tags",
      payload: {},
    },
  ],
  details: {
    table: {
      rows: [
        {
          columns: [
            { label: "邮箱", value: "user@example.com" },
            { label: "电话", value: "139****0000" },
          ],
        },
        {
          columns: [
            {
              label: "磁盘使用率",
              value: "0.2",
              view: "percent_bar",
              payload: { text: "20 GB free / 100 GB" },
            },
            { label: "关联索引模式", value: ["logs-*", "metrics-*"], view: "tags" },
          ],
        },
      ],
    },
  },
};

export const labelData = {
  type: "user",
  id: "uuid-demo-1",
  icon: "user",
  title: "示例用户",
  color: "#0f0f0f",
  subtitle: "示例部门",
  url: "mailto:user@example.com",
};

export const labelData2 = {
  type: "user",
  id: "uuid-demo-2",
  icon: "https://picsum.photos/40?random=42",
  title: "示例用户",
  url: "mailto:user@example.com",
};

export const user_icon_title = {
  type: "user",
  id: "u_icon_title",
  icon: "https://picsum.photos/40?random=11",
  title: "示例用户A",
};

export const user_only_icon = {
  type: "user",
  id: "u_only_icon",
  icon: "https://picsum.photos/40?random=12",
};

export const user_only_title = {
  type: "user",
  id: "u_only_title",
  title: "示例用户B",
};

export const user_icon_title_url = {
  type: "user",
  id: "u_icon_title_url",
  icon: "https://picsum.photos/40?random=13",
  title: "示例用户C",
  url: "mailto:user@example.com",
};

export const user_icon_title_color_subtitle = {
  type: "user",
  id: "u_icon_title_color_subtitle",
  icon: "https://picsum.photos/40?random=14",
  title: "示例用户D",
  color: "#34c759",
  subtitle: "在线",
};

export const user_1 = {
  type: "user",
  id: "demo-user-1",
  icon: "mail",
  title: "demo_user",
  subtitle: "demo@example.com",
};

export const user_2 = {
  type: "user",
  id: "demo-user-2",
  icon: "mail",
  title: "test_user",
  subtitle: "test@example.com",
};
