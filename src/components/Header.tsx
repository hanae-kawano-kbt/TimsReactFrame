import { Box, Typography, SvgIcon, Breadcrumbs, Link } from '@mui/material'
import { FC } from 'react'
import { Theme } from '@mui/material'
import { ReactComponent as MenuIcon } from '../assets/icons/menu_white.svg'
import { CurrentMenu } from '../Tims'
import { menus, OVERALL_REPORT_NAME, TOP_REPORT_NAME } from '../menuConfig'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    pb: '13px',
    borderBottom: (theme: Theme) => `1px solid ${theme.colors.line}`,
  },
  hamburgerIcon: {
    cursor: 'pointer',
    width: 'auto',
    height: 'auto',
  },
}

const StyledLink = ({ children, ...props }: any) => {
  return props.onClick === undefined ? (
    <Typography>{children}</Typography>
  ) : (
    <Link
      underline="hover"
      color="inherit"
      {...props}
      sx={{ cursor: 'pointer' }}
    >
      {children}
    </Link>
  )
}

type Props = {
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>
  isOpenMenu: boolean
  currentMenu: CurrentMenu
  setCurrentMenu: React.Dispatch<React.SetStateAction<CurrentMenu>>
}

export const Header: FC<Props> = ({
  isOpenMenu,
  setIsOpenMenu,
  currentMenu,
  setCurrentMenu,
}) => {
  // パンくずリストに工場全体が押下される時
  const handleBackToOverallReport = () => {
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
  }

  // パンくずリストに各課が押下される時
  const handleBackToMainReport = () => {
    const report = menus
      .find((menu) => menu.title === currentMenu.mainTitle)
      ?.subMenu.find((subMenu) => subMenu.title === TOP_REPORT_NAME)
    setCurrentMenu({
      mainTitle: currentMenu.mainTitle,
      subMenuTitle: report?.title,
      subMenuEmbedUrl: report?.embedUrl,
      detailTitle: undefined,
      detailEmbedUrl: undefined,
      underMenu: undefined,
      underMenuTitle: undefined,
      underMenuEmbedUrl: undefined,
      noMenuFlag: report?.noMenuFlag ? report?.noMenuFlag : false
    })
  }

  // パンくずリストに各課のサブメニューが押下される時(MARなど)
  const handleBackToSubMenuReport = () => {
    const report = menus
      .find((menu) => menu.title === currentMenu.mainTitle)
      ?.subMenu.find((subMenu) => subMenu.title === currentMenu.subMenuTitle)
    setCurrentMenu({
      mainTitle: currentMenu.mainTitle,
      subMenuTitle: report?.title,
      subMenuEmbedUrl: report?.embedUrl,
      detailTitle: undefined,
      detailEmbedUrl: undefined,
      underMenu: undefined,
      underMenuTitle: undefined,
      underMenuEmbedUrl: undefined,
      noMenuFlag: report?.noMenuFlag
    })
  }

  // パンくずリストの詳細メニューが押されたとき(S,Q,Cなど)
  const handleBackToDetailMenuReport = () => {
    const report = menus
      .find((menu) => menu.title === currentMenu.mainTitle)
      ?.subMenu.find((subMenu) => subMenu.title === currentMenu.subMenuTitle)
      ?.details.find((detail) => detail.title === currentMenu.detailTitle)

    setCurrentMenu({
      mainTitle: currentMenu.mainTitle,
      subMenuTitle: currentMenu.subMenuTitle,
      subMenuEmbedUrl: currentMenu.subMenuEmbedUrl,
      detailTitle: report?.title,
      detailEmbedUrl: report?.embedUrl,
      underMenu: undefined,
      underMenuTitle: undefined,
      underMenuEmbedUrl: undefined,
      noMenuFlag: false // TODO: 調整
    })
  }

  return (
    <Box sx={styles.root}>
      <Box mr={4}>
        <SvgIcon
          component={MenuIcon}
          sx={styles.hamburgerIcon}
          width="18"
          height="14"
          viewBox="0 0 18 14"
          onClick={() => setIsOpenMenu(!isOpenMenu)}
        />
      </Box>
      <Box mr="25px">
        <Typography fontSize={27}>TIMs</Typography>
      </Box>
      <Box display="flex" flexDirection="column" mr="auto">
        <Box>
          <Typography variant="h1">筑波 製造情報管理システム</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">
            Tsukuba Plant Manufacturing Information Management System
          </Typography>
        </Box>
      </Box>
      <Box>
        <Breadcrumbs
          separator="＞"
          aria-label="breadcrumb"
          sx={{ color: '#fff' }}
        >
          <StyledLink
            key="1"
            onClick={
              currentMenu.mainTitle !== OVERALL_REPORT_NAME ||
              currentMenu.detailTitle !== undefined
                ? handleBackToOverallReport
                : undefined
            }
          >
            {OVERALL_REPORT_NAME}
          </StyledLink>
          {currentMenu.mainTitle !== OVERALL_REPORT_NAME && (
            <StyledLink
              key="2"
              onClick={
                currentMenu.subMenuTitle !== TOP_REPORT_NAME ||
                currentMenu.detailTitle !== undefined
                  ? handleBackToMainReport
                  : undefined
              }
            >
              {currentMenu.mainTitle}
            </StyledLink>
          )}
          {currentMenu.subMenuTitle !== TOP_REPORT_NAME && (
            <StyledLink
              key="3"
              onClick={
                currentMenu.detailTitle !== undefined
                  ? handleBackToSubMenuReport
                  : undefined
              }
            >
              {currentMenu.subMenuTitle}
            </StyledLink>
          )}
          {currentMenu.detailTitle !== undefined && currentMenu.underMenu === undefined && (
            <StyledLink key="4" onClick={
              currentMenu.underMenuTitle !== undefined
                ? handleBackToDetailMenuReport
                : undefined
            }>
              {currentMenu.detailTitle}
            </StyledLink>
          )}
          {currentMenu.underMenuTitle !== undefined && (
            <StyledLink key="5" onClick={undefined}>
              {currentMenu.underMenuTitle}
            </StyledLink>
          )}
        </Breadcrumbs>
      </Box>
    </Box>
  )
}
