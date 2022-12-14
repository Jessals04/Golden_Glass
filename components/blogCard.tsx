import Link from 'next/link'
import { AiFillRightCircle } from 'react-icons/ai'


export default function BlogCard({title, publishDate, slug, contentHTML, authorName, avatarURL, coverImageURL, numLikes}: {title:string, publishDate:string, slug:string, contentHTML:string, authorName:string, avatarURL:string, coverImageURL:string, numLikes:number}) {
  return (
    <div>
        <Link href={'/posts/' + slug}>
            <div className='p-2 bg-c-grey bg-opacity-5 rounded-lg border-2 border-opacity-25 border-c-grey animate-fade-in-up max-w-3xl flex justify-between gap-x-10 noDrop active:opacity-90 shadow-lg hover:shadow-md'>
                <div className='text-xl w-full'>
                    <h1 className=''>{title}</h1>
                    <p className='text-sm text-c-grey'>Published: <span className='text-c-green'>{publishDate}</span></p>
                    <p className='text-sm text-c-grey'>Likes: <span className='text-c-green'>{numLikes}</span></p>
                    <div className='pt-3 flex gap-x-2'>
                        <img className='w-12 flatImg' src={avatarURL} alt="Avatar" />
                        <p className='text-sm my-auto'>Written by:<br/>{authorName}</p>
                    </div>
                </div>
                <div className='w-3/12 my-auto hidden md:block'>
                    <img className='flatImg h-24 w-36 object-cover m-auto' src={coverImageURL} alt="Cover Image" />
                </div>
                <div className='my-auto md:pr-6'>
                    <AiFillRightCircle size={30} color='#D3D4D9'/>
                </div>
            </div>
        </Link>
    </div>
  )
}
