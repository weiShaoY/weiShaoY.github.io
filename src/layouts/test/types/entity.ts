import type { BasicStatus, PermissionType } from './enum'

/**
 * 表示用户的访问令牌，包括访问令牌和刷新令牌
 */
export type UserToken = {

  /**
   * 访问令牌
   */
  accessToken?: string

  /**
   * 刷新令牌
   */
  refreshToken?: string
}

/**
 * 表示用户信息
 */
export type UserInfo = {

  /**
   * 用户 ID
   */
  id: string

  /**
   * 用户电子邮件
   */
  email: string

  /**
   * 用户名
   */
  username: string

  /**
   * 用户密码（可选）
   */
  password?: string

  /**
   * 用户头像 URL（可选）
   */
  avatar?: string

  /**
   * 用户角色（可选）
   */
  role?: Role

  /**
   * 用户状态（可选）
   */
  status?: BasicStatus

  /**
   * 用户权限列表（可选）
   */
  permissions?: Permission[]
}

/**
 * 表示组织信息
 */
export type Organization = {

  /**
   * 组织 ID
   */
  id: string

  /**
   * 组织名称
   */
  name: string

  /**
   * 组织状态（启用或禁用）
   */
  status: 'enable' | 'disable'

  /**
   * 组织描述（可选）
   */
  desc?: string

  /**
   * 组织排序顺序（可选）
   */
  order?: number

  /**
   * 子组织列表（可选）
   */
  children?: Organization[]
}

/**
 * 表示权限信息
 */
export type Permission = {

  /**
   * 权限 ID
   */
  id: string

  /**
   * 父权限 ID
   */
  parentId: string

  /**
   * 权限名称
   */
  name: string

  /**
   * 权限标签
   */
  label: string

  /**
   * 权限类型
   */
  type: PermissionType

  /**
   * 权限路由
   */
  route: string

  /**
   * 权限状态（可选）
   */
  status?: BasicStatus

  /**
   * 权限排序顺序（可选）
   */
  order?: number

  /**
   * 权限图标（可选）
   */
  icon?: string
  /**
   * 权限组件（可选）
   */
  component?: string

  /**
   * 是否隐藏权限（可选）
   */
  hide?: boolean

  /**
   * 是否隐藏选项卡（可选）
   */
  hideTab?: boolean

  /**
   * 框架来源 URL（可选）
   */
  frameSrc?: string

  /**
   * 是否为新功能（可选）
   */
  newFeature?: boolean

  /**
   * 子权限列表（可选）
   */
  children?: Permission[]
}

/**
 * 表示角色信息
 */
export type Role = {

  /**
   * 角色 ID
   */
  id: string

  /**
   * 角色名称
   */
  name: string

  /**
   * 角色标签
   */
  label: string

  /**
   * 角色状态
   */
  status: BasicStatus

  /**
   * 角色排序顺序（可选）
   */
  order?: number

  /**
   * 角色描述（可选）
   */
  desc?: string

  /**
   * 角色权限列表（可选）
   */
  permission?: Permission[]
}
