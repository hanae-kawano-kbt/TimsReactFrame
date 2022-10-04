// #region imports
import { Box, Paper, selectClasses, SvgIcon } from '@mui/material'
import { FC, useEffect, useState, useRef, useMemo } from 'react'
import { MenuBar } from './components/Menu'
import { Header } from './components/Header'
import { Select, SelectElementType } from './components/Select'
import { Theme, Collapse } from '@mui/material'
import { Menu as MuiMenu, MenuItem } from '@mui/material'
import { UserAgentApplication, AuthError, AuthResponse } from 'msal'
import { clientId, scopes } from './authConfig'
import { PowerBIEmbed } from 'powerbi-client-react'
import { models, Report, service, Embed } from 'powerbi-client'
import 'powerbi-report-authoring'
import {
  menus,
  Detail,
  Under,
  OVERALL_REPORT_NAME,
  TOP_REPORT_NAME,
} from './menuConfig'
import { ReactComponent as arrowLeftIcon } from './assets/icons/arrow_left.svg'
// #endregion imports

// #region Styles
const styles = {
  root: {
    width: '100%'
  },
  collapseRoot: {
    zIndex: 1000,
    position: 'absolute',
    boxShadow: '0px 3px 6px #2C28281C'
  },
  contentContainer: {
    height: 'calc(100vh - 13px)',
    windth: '100vw',
    overflow: 'hidden',
    flexGrow: '1',
    padding: '13px 26px 0 30px',
    display: 'flex',
    flexDirection: 'column',
    color: (theme: Theme) => theme.colors.white,
    background: (theme: Theme) =>
      `linear-gradient(180deg, ${theme.colors.mainGreen} 137px, transparent 0%)`,
  },
  btnList: {
    position: 'relative',
    height: '70px'
  },
  slicerList: {
    position: 'absolute',
    right: '0px',
    alignItems: 'center',
    height: '70px'
  },
  topBtn: {
    padding: '13px 0'
  },
  btnMenu: {
    display: 'flex',
    position: 'absolute',
    left: '60px',
    padding: '13px 0'
  },
  pulldownMenu: {
    display: 'flex',
    position: 'absolute',
    left: '60px',
    padding: '13px 0'
  },
  powerbiContainer: {
    flexGrow: '1',
    marginTop: '13px',
    borderRadius: '0',
    background: 'none',
    padding: '0',
    boxShadow: 'none'
  },
  backBtn: {
    height: 44,
    width: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    border: (theme: Theme) => `1px solid ${theme.colors.line}`,
    borderRadius: 2,
    boxShadow: '0px 3px 6px #1717172d',
    '&:hover': {
      color: (theme: Theme) => theme.colors.mainGreen,
      backgroundColor: (theme: Theme) => theme.colors.white,
    },
  },
  btn: {
    height: 44,
    minWidth: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28b8b9',
    cursor: 'pointer',
    border: (theme: Theme) => `1px solid ${theme.colors.line}`,
    '&:nth-of-type(1)': {
      borderRight: 'none',
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    '&:last-child': {
      borderLeft: 'none',
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
    },
    '&:hover': {
      color: (theme: Theme) => theme.colors.mainGreen,
      backgroundColor: (theme: Theme) => theme.colors.white,
    },
  },
  clickedBtn: {
    color: (theme: Theme) => theme.colors.mainGreen,
    backgroundColor: (theme: Theme) => theme.colors.white,
  },
  bookmarksContainer: {
    position: 'relative',
    boxShadow: '0px 3px 6px #1717172d',
    borderRadius: '8px',
  },
  subMenu: {
    transform: 'translate(0, -21.5px)',
    '& .MuiList-root': {
      py: '11px',
    },
    '& .MuiMenuItem-root': {
      padding: '4px 14px',
      color: '#41424b',
    },
  },
  subMenuPaper: {
    background: '#d8efef',
    overflow: 'visible',
    filter: 'drop-shadow(0px 3px 6px #2c28281c)',
    borderRadius: 0,
    mt: 1.5,
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 20,
      width: 20,
      height: 20,
      bgcolor: '#d8efef',
      transform: 'translate(-50%, -50%) rotate(45deg)',
      zIndex: 0,
    },
  },
}
// #endregion Styles

// #region Exports
export type CurrentMenu = {
  mainTitle: string
  subMenuTitle: string | undefined
  subMenuEmbedUrl: string | undefined
  detailTitle: string | undefined
  detailEmbedUrl: string | undefined
  underMenu: Under[] | undefined
  underMenuTitle: string | undefined
  underMenuEmbedUrl: string | undefined
  noMenuFlag: boolean | undefined
}
// #endregion Exports

export const Tims: FC = () => {
  // 現在表示しているPowerBIの情報
  // 初期で工場全体の情報を設定する

  // #region Consts
  const [currentMenu, setCurrentMenu] = useState<CurrentMenu>({
    // 初期でmainTitleが「工場全体」
    mainTitle: menus[0].title,
    // 初期でsubMenuTitleが「トップ」
    // ※工場全体の場合に、「トップ」を定義しているが、サイドメニューに表示する必要ない、「工場全体」のメニューを押下すると、すぐ「工場全体」のPowerBIを表示する）
    // ※「工場全体」のメニュー以外はメニューをクリックするとサブメニューが現れる
    subMenuTitle: menus[0].subMenu[0].title,
    subMenuEmbedUrl: menus[0].subMenu[0].embedUrl,
    // 「S」「Q」「Mc」などのヘッダーのメニュー
    //　初期でなのも設定しない
    detailTitle: undefined,
    detailEmbedUrl: undefined,
    underMenu: undefined,
    underMenuTitle: undefined,
    underMenuEmbedUrl: undefined,
    // 課の下層メニューがあるかないか
    noMenuFlag: menus[0].noMenuFlag ? menus[0].noMenuFlag : false
  })
  // ブックマークのリスト
  const [bookmarks, setBookmarks] = useState<
    models.IReportBookmark[] | undefined
  >(undefined)
  // 選択しているブックマーク
  const [currentBookmark, setCurrentBookmark] = useState<
    models.IReportBookmark | undefined
  >(undefined)
  // サイドメニューが展開しているかステート
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  // レポートDOMのrefを保管するref
  const reportRef = useRef<Report | undefined>(undefined)
  // トークン
  // アイエンター社内に開発する時、PowerBIのサイトからトークンを取って開発する（1時間ごとに再取得必要）
  // クボタ様を渡す時に、「undefined」で設定
  const accessToken = useRef<string | undefined>(
    //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMzc1NmYxOTYtZDdkYi00NTFiLWIyYTktOWUxYTAxODU1ZmUxLyIsImlhdCI6MTY2MDYzMjc1OCwibmJmIjoxNjYwNjMyNzU4LCJleHAiOjE2NjA2MzY4NjAsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUFHV2JEOWdITWFDaGcrMlF4aDJ3N3pEUFd0dVZkWW1RYWd0M29TdVUxNDNkUm1sd1JFbS9mSCtzVFgvYUQrRTBxTnBIQVhNNWRHcW85MkVKYzZMUmJHV3BrWGRQRXJJRnFGR0g4QUIzeVdmQT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIyIiwiZmFtaWx5X25hbWUiOiLlt6Xol6QiLCJnaXZlbl9uYW1lIjoi57a-6I-vIiwiaXBhZGRyIjoiMTE0LjE2Mi4xMzUuMTMzIiwibmFtZSI6IuW3peiXpCDntr7oj68iLCJvaWQiOiJkZDUxMjhjNi0wYjdjLTRiNTUtYTQ3NS1lNzE2NjUzNmVhZmIiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMzA0MzQ1OTY1Ny0zNDY4NDYyNDU4LTIwMjUyMDM2ODUtMTc2OTMiLCJwdWlkIjoiMTAwMzdGRkVBOUExQkRBMSIsInJoIjoiMC5BVDBBbHZGV045dlhHMFd5cVo0YUFZVmY0UWtBQUFBQUFBQUF3QUFBQUFBQUFBQTlBTncuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiQWo0SWdqekRkUFRwWHJ2VGJMZ3JIRWk1STI5aHVJNTEyNEVCZlZyc2NNdyIsInRpZCI6IjM3NTZmMTk2LWQ3ZGItNDUxYi1iMmE5LTllMWEwMTg1NWZlMSIsInVuaXF1ZV9uYW1lIjoiYS1rdWRvQGktZW50ZXIuY28uanAiLCJ1cG4iOiJhLWt1ZG9AaS1lbnRlci5jby5qcCIsInV0aSI6InJvRUF1RE5aTWtHbDQwWTF4c1p4QUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.Cim7X08xSKIy2DIJyZzwlkA1go9E-9pdtvouinGOdqUDdk2t-_Q-gXK7uLywC202KLKI8cvyZzbcx2TLtAwHE-cj9X-KxQ4PhIImXcAfgGRmbYbj1CS_kt3G_lwQVSFXkNcZhyqzlejG3WNwEnr4lKOYlt4k4hwV-OL5J9m0sN4qzOMW5JSvpxz8kQ0MfY4VSRN24KxMgg_l-4oxPZeG00Mg_piF_j7PGUEPGyqCubx1jmQ0CayKz4JDEft1Av-DUUbGfkhMx5oJCbLt9d_TSmR4YvhuLiIref2jFn3rmMW2fsV58LaWHV16HS_pqBYYwUsBTDEAD5NGjyzlDSD00g'
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvY2RmMDlkY2UtYzg2NS00ZjQyLTkwMWQtMzJkM2Q4ZDNmNjBmLyIsImlhdCI6MTY2NDQwNzI2OSwibmJmIjoxNjY0NDA3MjY5LCJleHAiOjE2NjQ0MTEyMTMsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUF5YmhiejZOdU1BdEZWMmxrcmlaZHJmVEo4ZjNWTUZuUXpJRGhVVjFvNjRKMzNJL3FLZ0toNWR4bGR0Z0Zhc3J4IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMiIsImZhbWlseV9uYW1lIjoib2UiLCJnaXZlbl9uYW1lIjoicnlvIiwiaXBhZGRyIjoiNTguMTkxLjYuMiIsIm5hbWUiOiLlpKfmsZ8g5LukIiwib2lkIjoiOGEzZjlkMzgtNDFiNy00NzkwLWE4YzQtNzM4ZjYzNWY4YmM3IiwicHVpZCI6IjEwMDMyMDAxNTYzRDBDNDgiLCJyaCI6IjAuQVNzQXpwM3d6V1hJUWstUUhUTFQyTlAyRHdrQUFBQUFBQUFBd0FBQUFBQUFBQUFyQVBNLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJpbmtub3dubnR3ayJdLCJzdWIiOiIxV1BnMVlqWDlablYydk1fY180Wm1JQ20xRFY0LVJ6aWhpQ2FkZGpUZEtvIiwidGlkIjoiY2RmMDlkY2UtYzg2NS00ZjQyLTkwMWQtMzJkM2Q4ZDNmNjBmIiwidW5pcXVlX25hbWUiOiJyeW8ub2VAa2lhbS5pbnRyYS5rYnQtZ2xvYmFsLmNvbSIsInVwbiI6InJ5by5vZUBraWFtLmludHJhLmtidC1nbG9iYWwuY29tIiwidXRpIjoiLUtGRzhkUlVla3lLeGRuODBVd3JBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.gbbQSNLLT39-7Z4BUCf_bsg2iyNRN91eNWxUaX89KF5gBIBWQaDslyAYOMKVQm5EhLAq237zhya0moVyMGvBjDb4mFRtiYOimjGlRukpixrklKL7nm0RZenXuALZUo0y7dvDMosDQ-DbEnO4RzI22UXmXlnR6wnp_L6905UoAMmQpGgGl5NQuKulTUkInSzeP_P-M9GxOFokQZuediIqSJJiPxg7Ca-MLqXxwmogz14XzaTnE6numwpPE2g9G8C5103oPlQUTTHJwgTs34QVTbYUii_fnDYhmiPTwaiH-_D-GCZbz6h1QjXqrv51f-uHJw5m5jYVGI4w0fzBhIayOg'
  )

  // 最下層メニューの開閉
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    mainTitle: string
  ) => {
    setAnchorEl(event.currentTarget)
  }
  // 最下層メニューの開閉
  const handleClose = () => {
    setAnchorEl(null)
  }


  // 「工場全体」のPowerBIを表示しているか変数
  const isMainPage = useMemo(
    () =>
      currentMenu.mainTitle === OVERALL_REPORT_NAME &&
      currentMenu.subMenuTitle === TOP_REPORT_NAME &&
      currentMenu.detailTitle === undefined,
    [currentMenu]
  )

  // PowerBIを表示するのに設定の値
  const [reportConfig, setReportConfig] =
    useState<models.IReportEmbedConfiguration>({
      type: 'report',
      // 表示するembedUrl
      embedUrl: undefined,
      // トークン
      accessToken: undefined,
      // トークンのタイプ
      //　アイエンター内に実装する時に、「Aad」にする
      // クボタ様を渡す時に、「Embed」で設定
      // tokenType: models.TokenType.Aad,
      tokenType: models.TokenType.Aad,
      settings: {
        panes: {
          filters: {
            // フィルターパネルを表示しないように設定
            expanded: false,
            visible: false,
          },
          pageNavigation: {
            // エクセルみたいに下ページパネルを表示しないように設定
            visible: false,
          },
        },
      },
    })

  // フィルターを開発する
  const slicerState = useRef<any>([])




  // #endregion Consts

  // #region EventHandlers
  const eventHandlersMap = new Map([
    // PowerBIが取得される時
    [
      'loaded',
      async () => {
        console.log('Report has loaded')
        if (reportRef.current === undefined) return

        try {
          // ブックマークを取得
          const bookmarks =
            await reportRef.current.bookmarksManager.getBookmarks()
          // 「()」で囲まれるブックマークしか取得しない
          const filteredBookmarks = bookmarks.filter((item) =>
            /^\(.+\)$/.test(item.displayName)
          )
          //　ブックマークのリストをセット
          setBookmarks(filteredBookmarks)
          if (currentBookmark === undefined)
            setCurrentBookmark(filteredBookmarks[0])

          // 選択したフィルターを反映
          if (slicerState.current.length === 0) return
          const pages = await reportRef.current!.getPages()
          const activePage = pages?.filter(function (page) {
            return page.isActive
          })[0]
          if (!activePage) return
          const visuals = await activePage.getVisuals()
          const slicers = visuals.filter((visual) => {
            return visual.type === 'slicer'
          })
          slicers.forEach(async (slicer) => {
            const state = await slicer.getSlicerState()
            // @ts-ignore
            const columnTarget = state.targets[0].column
            // @ts-ignore
            const tableTarget = state.targets[0].table

            // 設定したフィルターを検索する
            const savedState = slicerState.current.find(
              (slicerState: any) =>
                slicerState.targets[0].column === columnTarget &&
                slicerState.targets[0].table === tableTarget
            )
            // 設定したフィルターを設定する
            if (savedState !== undefined) {
              await slicer.setSlicerState({
                filters: [...savedState.filters],
              })
            }
          })
        } catch (error) {
          console.log(error)
        }
      },
    ],
    // PowerBIが表示される時
    [
      'rendered',
      async () => {
        console.log('Report has rendered')
      },
    ],
    // PowerBIのエラーが発生する時
    [
      'error',
      (event?: service.ICustomEvent<any>) => {
        if (event) {
          console.error(event.detail)
        }
      },
    ],
    // detaを選択される時
    [
      'dataSelected',
      async (event: any) => {
        // Slicerのstateを保管する(slicerの中にフィルターがある)
        try {
          const pages = await reportRef.current!.getPages()
          const activePage = pages?.filter(function (page) {
            return page.isActive
          })[0]

          if (!activePage) return

          const visuals = await activePage.getVisuals()
          const slicers = visuals.filter((visual) => {
            return visual.type === 'slicer'
          })
          // 現在のslicerのステートを[]にする
          slicerState.current = []
          // 取得したslicerのステートを保管する
          slicers.forEach(async (slicer) => {
            const state = await slicer.getSlicerState()
            slicerState.current = [...slicerState.current, state]
          })
        } catch (errors) {
          console.log(errors)
        }
      },
    ],
    // ボタンがクリックされる時
    [
      'buttonClicked',
      (event: any) => {
        // ボタンをクリックした時に、ボタンのtitleを取得できる
        // titleは「トラクタ課/トップ/S」という形に設定されている

        //　titleを取得「トラクタ課/トップ/S」
        const destinationTitle = event.detail.title
        //　titleを分解する["トラクタ課","トップ","S"]
        const destinationTitleExplode = destinationTitle.split('/')

        // 外だしJSONファイルにPowerBIのembedUrlを検索する
        // メインメニューを検索(工場全体やトラクタ課など)
        const menu = menus.find(
          (menu) => menu.title === destinationTitleExplode[0]
        )
        if (menu === undefined) return
        //　メインメニューの中のサブメニューを検索(トップやMARなど)
        const subMenu = menu.subMenu.find(
          (subMenu: any) => subMenu.title === destinationTitleExplode[1]
        )
        if (subMenu === undefined) return
        //　もっと細かくメニューを検索(SやQやMcなど)
        const detail = subMenu.details.find(
          (subMenu: any) => subMenu.title === destinationTitleExplode[2]
        )

        // 表示させるPowerBI情報を設定する
        setCurrentMenu({
          mainTitle: menu.title,
          subMenuTitle: subMenu.title,
          subMenuEmbedUrl: subMenu.embedUrl,
          detailTitle: detail ? detail.title : undefined,
          detailEmbedUrl: detail ? detail.embedUrl : undefined,
          underMenu: undefined,
          underMenuTitle: undefined,
          underMenuEmbedUrl: undefined,
          noMenuFlag: subMenu.noMenuFlag ? subMenu.noMenuFlag : false
        })
      },
    ],
  ])
  // #endregion EventHandlers

  // トークンを取得するため認証を行う関数(検証できないので、サンプルのまま実装)
  const authenticate = () => {
    console.log('Auth')
    const msalConfig = {
      auth: {
        clientId: clientId,
      },
    }

    const loginRequest = {
      scopes: scopes,
    }

    const msalInstance: UserAgentApplication = new UserAgentApplication(
      msalConfig
    )

    const successCallback = (response: AuthResponse) => {
      console.log('success', response)
      if (response.tokenType === 'id_token') {
        authenticate()
      } else if (response.tokenType === 'access_token') {
        accessToken.current = response.accessToken

        // Refresh User Permissions
        tryRefreshUserPermissions()
        // getembedUrl(config.reportId)
        setReportConfig({
          ...reportConfig,
          accessToken: response.accessToken,
          embedUrl: currentMenu?.subMenuEmbedUrl,
        })
      } else {
        console.log('Token type is: ' + response.tokenType)
      }
    }

    const failCallBack = (error: AuthError) => {
      console.log('Authentication was fail', error)
    }

    msalInstance.handleRedirectCallback(successCallback, failCallBack)

    // check if there is a cached user
    if (msalInstance.getAccount()) {
      // get access token silently from cached id-token
      msalInstance
        .acquireTokenSilent(loginRequest)
        .then((response: AuthResponse) => {
          // get access token from response: response.accessToken
          accessToken.current = response.accessToken
          // getembedUrl(config.reportId)
          setReportConfig({
            ...reportConfig,
            accessToken: response.accessToken,
            embedUrl: currentMenu?.subMenuEmbedUrl,
          })
        })
        .catch((err: AuthError) => {
          // refresh access token silently from cached id-token
          // makes the call to handleredirectcallback
          if (err.name === 'InteractionRequiredAuthError') {
            msalInstance.acquireTokenRedirect(loginRequest)
          } else {
            console.log('Authentication was fail', err)
          }
        })
    } else {
      // user is not logged in or cached, you will need to log them in to acquire a token
      msalInstance.loginRedirect(loginRequest)
    }
  }

  // 再認証を行う関数(検証できないので、サンプルのまま実装)
  const tryRefreshUserPermissions = () => {
    fetch('https://api.powerbi.com/v1.0/myorg/RefreshUserPermissions', {
      headers: {
        Authorization: 'Bearer ' + accessToken.current,
      },
      method: 'POST',
    })
      .then(function (response) {
        if (response.ok) {
          console.log('User permissions refreshed successfully.')
        } else {
          // Too many requests in one hour will cause the API to fail
          if (response.status === 429) {
            console.error(
              'Permissions refresh will be available in up to an hour.'
            )
          } else {
            console.error(response)
          }
        }
      })
      .catch(function (error) {
        console.error('Failure in making API call.' + error)
      })
  }

  useEffect(() => {
    console.log('初期表示')
    // クボタ様を渡す時に、authenticate()を行うため、コメントを戻す
    // authenticate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (accessToken.current === undefined) return
    // PowerBIを切り替える時に、ブックマークをクリアする
    setCurrentBookmark(undefined)
    //　切り替える先のPowerBIを判断
    //　currentMenuにdetailメニューの情報がある場合にdetail(S,Q,Mcなど)のPowerBIを表示するわけ
    //　currentMenuにdetailメニューの情報がない場合にsuvMenuのPowerBIを表示するわけ
    let embedUrl = undefined
    if (currentMenu.underMenuEmbedUrl) {
      embedUrl = currentMenu.underMenuEmbedUrl
    } else if (currentMenu.detailEmbedUrl) {
      embedUrl = currentMenu.detailEmbedUrl
    } else {
      embedUrl = currentMenu.subMenuEmbedUrl
    }
    //　レポートの設定を設定する
    setReportConfig({
      ...reportConfig,
      accessToken: accessToken.current,
      embedUrl: embedUrl,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMenu])

  // ブックマークを選択時
  const HandleChangeBookmark = async (item: models.IReportBookmark) => {
    if (reportRef.current === undefined) return
    try {
      await reportRef.current.bookmarksManager.apply(item.name)
      setCurrentBookmark(item)
    } catch (errors) {
      console.log(errors)
    }
  }

  // 「S」「Q」「C」などを選択時
  const HandleChangeDetail = (detail: Detail) => {
    if (detail.underMenu) {
      setCurrentMenu({
        ...currentMenu,
        detailTitle: detail.title,
        underMenu: detail.underMenu
      })
    } else if (detail.anotherTabFlag) {
      window.open(detail.embedUrl, '_blank');
    } else {
      setCurrentMenu({
        ...currentMenu,
        detailTitle: detail.title,
        detailEmbedUrl: detail.embedUrl,
        underMenu: undefined,
        underMenuTitle: undefined,
        underMenuEmbedUrl: undefined
      })
    }
  }

  // 最下層メニューを取得
  const HandleChangeUnder = (under: Under) => {
    setCurrentMenu({
      ...currentMenu,
      underMenuTitle: under.title,
      underMenuEmbedUrl: under.embedUrl,
    })
  }

  // バックボタン押下時
  const handleBack = () => {
    // 最下層メニューのPowerBIを表示している間にバックボタンを押下
    if (
      currentMenu.underMenuTitle !== undefined &&
      currentMenu.underMenuEmbedUrl !== undefined
    ) {
      // detailのPowerBIの情報を削除する（underとdetailの情報を削除し、subMenuのPowerBiを表示）
      setCurrentMenu({
        ...currentMenu,
        detailTitle: undefined,
        detailEmbedUrl: undefined,
        underMenu: undefined,
        underMenuTitle: undefined,
        underMenuEmbedUrl: undefined
      })
      return
    }

    // detailのPowerBIを表示している間、バックボタンを押下
    if (
      currentMenu.detailTitle !== undefined &&
      currentMenu.detailEmbedUrl !== undefined
    ) {
      // detailのPowerBIの情報を削除する（detailの情報がないと勝手に、subMenuのPowerBiを表示）
      setCurrentMenu({
        ...currentMenu,
        detailTitle: undefined,
        detailEmbedUrl: undefined,
      })
      return
    }

    // subMenu(トップの場合)のPowerBIを表示している間に、バックボタンを押下
    if (
      currentMenu.mainTitle !== OVERALL_REPORT_NAME &&
      currentMenu.subMenuTitle === TOP_REPORT_NAME
    ) {
      //　工場全体に画面遷移するため、工場全体のPowerBIの情報を検索
      const overallReport = menus
        .find((menu) => menu.title === OVERALL_REPORT_NAME)
        ?.subMenu.find((subMenu) => subMenu.title === TOP_REPORT_NAME)
      setCurrentMenu({
        mainTitle: OVERALL_REPORT_NAME,
        subMenuTitle: overallReport?.title,
        subMenuEmbedUrl: overallReport?.embedUrl,
        detailTitle: undefined,
        detailEmbedUrl: undefined,
        underMenu: undefined,
        underMenuTitle: undefined,
        underMenuEmbedUrl: undefined,
        noMenuFlag: overallReport?.noMenuFlag ? overallReport?.noMenuFlag : false
      })
      return
    }

    // 検査課などをスキップ
    if (
      currentMenu.mainTitle !== OVERALL_REPORT_NAME &&
      !currentMenu.noMenuFlag
    ) {
      //　工場全体に画面遷移するため、工場全体のPowerBIの情報を検索
      const overallReport = menus
        .find((menu) => menu.title === OVERALL_REPORT_NAME)
        ?.subMenu.find((subMenu) => subMenu.title === TOP_REPORT_NAME)
      setCurrentMenu({
        mainTitle: OVERALL_REPORT_NAME,
        subMenuTitle: overallReport?.title,
        subMenuEmbedUrl: overallReport?.embedUrl,
        detailTitle: undefined,
        detailEmbedUrl: undefined,
        underMenu: undefined,
        underMenuTitle: undefined,
        underMenuEmbedUrl: undefined,
        noMenuFlag: overallReport?.noMenuFlag ? overallReport?.noMenuFlag : false
      })
      return
    }

    // subMenu(トップ以外)のPowerBIを表示している間に、バックボタンを押下
    if (
      currentMenu.mainTitle !== OVERALL_REPORT_NAME &&
      currentMenu.subMenuTitle !== TOP_REPORT_NAME
    ) {
      //　課のトップに画面遷移するため、課のトップのPowerBIの情報を検索
      const topReport = menus
        .find((menu) => menu.title === currentMenu.mainTitle)
        ?.subMenu.find((subMenu) => subMenu.title === TOP_REPORT_NAME)
      setCurrentMenu({
        mainTitle: currentMenu.mainTitle,
        subMenuTitle: topReport?.title,
        subMenuEmbedUrl: topReport?.embedUrl,
        detailTitle: undefined,
        detailEmbedUrl: undefined,
        underMenu: undefined,
        underMenuTitle: undefined,
        underMenuEmbedUrl: undefined,
        noMenuFlag: topReport?.noMenuFlag ? topReport?.noMenuFlag : false
      })
      return
    }
  }

  // #region Box
  return (
    <Box sx={styles.root} display="flex">
      <Collapse in={isOpenMenu} orientation="horizontal" sx={styles.collapseRoot}>
        <MenuBar
          setIsOpenMenu={setIsOpenMenu}
          isOpenMenu={isOpenMenu}
          currentMenu={currentMenu}
          setCurrentMenu={setCurrentMenu}
          reportConfig={reportConfig}
          setReportConfig={setReportConfig}
        />
      </Collapse>
      <Box sx={styles.contentContainer}>
        <Header
          setIsOpenMenu={setIsOpenMenu}
          isOpenMenu={isOpenMenu}
          currentMenu={currentMenu}
          setCurrentMenu={setCurrentMenu}
        />
        {/*#region メニューボタンの段*/}
        <Box display="flex" sx={styles.btnList}>
          {/*メインページ以外はメインに戻れるボタンを表示*/}
          <Box style={styles.topBtn}>
            {!isMainPage && (
              <Box
                sx={styles.backBtn}
                mr={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                onClick={handleBack}
              >
                <SvgIcon
                  component={arrowLeftIcon}
                  sx={{ width: 'auto', height: 'auto' }}
                  width="18"
                  height="15.43"
                  viewBox="0 0 18 15.428"
                />
              </Box>
            )}
          </Box>
          {/*SQCDEのメニューらしい*/}
          <Box py={4} sx={styles.btnMenu}>
            <Box
              display="flex"
              sx={styles.bookmarksContainer}
              mr={bookmarks && bookmarks.length > 0 ? 4 : 0}
            >
              {bookmarks &&
                bookmarks.map((item) => {
                  if (item === null) return <Box />
                  const display = item.displayName.match(/\(([^)]*)\)/)![1]
                  return (
                    <Box
                      sx={{
                        ...styles.btn,
                        ...(currentBookmark?.displayName === item.displayName
                          ? styles.clickedBtn
                          : {}),
                      }}
                      key={item.displayName}
                      onClick={() => {
                        HandleChangeBookmark(item)
                      }}
                    >
                      {display}
                    </Box>
                  )
                })}
            </Box>
            <Box display="flex" sx={styles.bookmarksContainer}>
              {menus
                .find((menu) => menu.title === currentMenu.mainTitle)
                ?.subMenu.find(
                  (subMenu) => subMenu.title === currentMenu.subMenuTitle
                )
                ?.details.map((detial) => {
                  return (
                    <Box
                      sx={{
                        ...styles.btn,
                        ...(currentMenu.detailTitle === detial.title
                          ? styles.clickedBtn
                          : {}),
                        minWidth: 44,
                      }}
                      key={detial.title}
                      onClick={(e) => {
                        HandleChangeDetail(detial)
                        if (detial.underMenu) {
                          handleClick(e, detial.title)
                        }
                      }}
                    >
                      {detial.title}
                    </Box>
                  )
                })}
              {/*R工程などのサブメニュー*/}
              <MuiMenu
                anchorEl={anchorEl}
                id="sub-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                sx={styles.subMenu}
                PaperProps={{
                  elevation: 0,
                  sx: styles.subMenuPaper,
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 0, vertical: 70 }}
              >
                {menus
                  .find((menu) => menu.title === currentMenu.mainTitle)
                  ?.subMenu.find(
                    (subMenu) => subMenu.title === currentMenu.subMenuTitle
                  )
                  ?.details.find(
                    (detial) => detial.title === currentMenu.detailTitle
                  )
                  ?.underMenu?.map((under) => (
                    <MenuItem
                      key={under.title}
                      onClick={(e) => HandleChangeUnder(under)}
                    >{under.title}</MenuItem>
                  ))}
              </MuiMenu>
            </Box>
          </Box>
          <Box display="flex" sx={styles.slicerList}>
            {/*これが、スライサーになればいいな*/}
            <Select selectElementType={SelectElementType.years } />
            <Select selectElementType={SelectElementType.weeks } />
          </Box>
        </Box>
        {/*#endregion メニューボタンの段*/}
        {/*PowerBIContainer*/}
        <Box component={Paper} p={2} sx={styles.powerbiContainer}>
          <PowerBIEmbed
            embedConfig={reportConfig}
            eventHandlers={eventHandlersMap}
            cssClassName={'report-style-class'}
            getEmbeddedComponent={(embedObject: Embed) => {
              // console.log(
              //   `Embedded object of type "${embedObject.embedtype}" received`,
              //   embedObject
              // )
              reportRef.current = embedObject as Report
            }}
          />
        </Box>
      </Box>
    </Box>
    // #region Box

  )
}