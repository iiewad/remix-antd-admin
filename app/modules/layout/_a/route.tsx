import * as clientUtils from "~/utils/client";

import {
  AvatarDropDown,
  MenuFooterRender,
  SettingDrawerWrap,
  createActionRenderWrap,
  createTokens,
} from "./components";
import { Footer, MenuItemLink, MenuItemOutLink } from "~/components/common";
import { Outlet, useParams } from "@remix-run/react";
import { ProLayout, WaterMark } from "@ant-design/pro-components";
import { memo, useContext, useMemo, useState } from "react";

import { SettingContext } from "@/context";
import { prolayoutConfig } from "@/config/prolayout";
import { useGetUserInfoQuery } from "@/apis-client/common/user-info";
import { useNProgress } from "@/hooks";
import { useTranslation } from "react-i18next";

const resetStyles = {
  padding: "0px",
  margin: "0px",
  height: "100vh",
};

function AdminLayout() {
  useNProgress();
  const { data, isLoading } = useGetUserInfoQuery("");
  const { lang } = useParams();
  const value = useContext(SettingContext);
  const { menu = [], userInfo = {} } = data || ({} as any);
  const [pathname, setPathname] = useState(location.pathname);
  const token = useMemo(() => createTokens(value), [value]);
  const { t } = useTranslation();
  const route = useMemo(
    () => clientUtils.createProLayoutRoute(lang!, menu, t),
    [lang, menu, t],
  );

  return (
    <WaterMark content="Remix Antd Admin">
      <ProLayout
        location={{
          pathname,
        }}
        route={route}
        token={token}
        loading={isLoading}
        {...value.theme}
        logo={prolayoutConfig.logo}
        menu={prolayoutConfig.menu}
        style={resetStyles}
        title={prolayoutConfig.title}
        ErrorBoundary={false}
        pageTitleRender={false}
        contentStyle={resetStyles}
        layout={prolayoutConfig.layout as any}
        footerRender={() => <Footer />}
        suppressSiderWhenMenuEmpty={true}
        menuFooterRender={MenuFooterRender}
        actionsRender={createActionRenderWrap({ value })}
        avatarProps={{
          src: userInfo?.avatar || prolayoutConfig.avatar.src,
          size: prolayoutConfig.avatar.size as any,
          title: userInfo?.name,
          render: (_, dom) => {
            return <AvatarDropDown dom={dom} />;
          },
        }}
        menuItemRender={(item, dom) => {
          if (item.isLink) {
            return <MenuItemOutLink path={item.path!} dom={dom} />;
          }

          return (
            <MenuItemLink
              path={item.path!}
              dom={dom}
              setPathname={setPathname}
            />
          );
        }}
      >
        <Outlet />
        <SettingDrawerWrap theme={value.theme} setTheme={value.setTheme} />
      </ProLayout>
    </WaterMark>
  );
}

export const Route = memo(AdminLayout);
