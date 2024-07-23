import AddFaceswap from '@/components/AddFaceswap'

export default function CheersFaceswap() {
  return (
    <main className="max-w-[500px] mx-auto md:p-0 px-4 mt-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Cheer Faceswap 😆</h1>
        <p className="text-sm text-gray-500">Add a new face to your Cheers</p>
      </div>
      <AddFaceswap />
    </main>
  )
}