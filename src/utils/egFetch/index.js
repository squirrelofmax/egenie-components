// Created by Max on 17/06/17
// import React from 'react'
// import { Message } from 'element-react'
export default async function egFetch (...args) {
  console.log(...args, '进入egFetch')
  const response = await fetch(...args)
  if (!response.ok) {
    // Message.error({message: '网络错误，请检查！', showClose: true})
    return
  }
  try {
    const result = await response.json()
    if (result.status === 'Unauthenticated') {
      // Message.error(result.data)
      return result
    }
    return result
  } catch (e) {}
}
