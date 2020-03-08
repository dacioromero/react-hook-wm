import React, { useReducer, createContext, FC, useContext } from 'react'

type ForceUpdate = () => void

const initialArg = Symbol()
const reducer = (): symbol => Symbol()

export function useForceUpdate(): ForceUpdate {
  const [, forceUpdate] = useReducer(reducer, initialArg)

  return forceUpdate
}

type Hook<T> = () => T

interface CreateProviderAndHookOpts<T> {
  useHook: Hook<T>
  defaultValue: T
  name: string
}

type ProviderAndHook<T> = [FC, Hook<T>]

export function createProviderAndHook<T>(
  opts: CreateProviderAndHookOpts<T>
): ProviderAndHook<T> {
  const { useHook, defaultValue, name } = opts

  const Context = createContext(defaultValue)
  Context.displayName = `${name}Context`

  const Component: FC = ({ children }) => {
    const value = useHook()

    return <Context.Provider value={value}>{children}</Context.Provider>
  }

  Component.displayName = `${name}Provider`

  const hookName = `use${name}Context`
  const { [hookName]: useHookContext } = {
    [hookName]: (): T => useContext(Context)
  }

  return [Component, useHookContext]
}
