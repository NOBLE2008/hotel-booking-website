import Link from 'next/link'
import React from 'react'

export default function notFound() {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">This Cabin could not be found</p>

      <Link
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        href={'/cabins'}
      >
        Browse our luxury cabins
      </Link>
    </main>
  )
}
