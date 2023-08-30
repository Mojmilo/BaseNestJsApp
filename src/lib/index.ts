'use server'

export const getVersion = () => {
    return process.env.npm_package_version as string
}