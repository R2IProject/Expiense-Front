import withTM from "next-transpile-modules";

const withTranspileModules = withTM([
  "rc-util",
  "rc-pagination",
  "rc-picker",
  "@ant-design/icons",
]);

export default withTranspileModules({
  reactStrictMode: true,
});
