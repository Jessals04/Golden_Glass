import { HiOutlineExternalLink } from 'react-icons/hi';

export default function SkillsProjects() {
    return (
        <div className="border-2 border-resume-light-blue border-opacity-50 rounded-lg m-6 p-4 bg-resume-charcoal bg-opacity-50 flex flex-col xl:flex-row gap-4 lg:gap-10">
            <div className='border-b-2 xl:border-b-0 xl:border-r-2 pb-4 xl:pb-0 xl:pr-10 lg:pb-10 lg:max-w-md'>
                <h1 className='text-3xl pb-2'>Skills</h1>
                <ul className='list-disc pl-4'>
                    <li>Computer Troubleshooting</li>
                    <li>Programming:
                        <ul className='list-disc pl-6'>
                            <li>JavaScript, ReactJS, NextJS, GraphQL (most competent)</li>
                            <li>Java</li>
                            <li>Python</li>
                            <li>SQL</li>
                        </ul>
                    </li>
                    <li>User Centred Design:
                        <ul>
                            <li>Sketching</li>
                            <li>Figma</li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div className='lg:max-w-sm'>
                <h1 className='text-3xl pb-2'>Projects</h1>
                <ul>
                    <li className='flex gap-2'>
                        <HiOutlineExternalLink className='my-auto' />
                        <h2>Project 1</h2>
                    </li>
                    <li className='flex gap-2'>
                        <HiOutlineExternalLink className='my-auto' />
                        <h2>Project 2</h2>
                    </li>
                    <li className='flex gap-2'>
                        <HiOutlineExternalLink className='my-auto' />
                        <h2>Project 3</h2>
                    </li>
                </ul>
            </div>
        </div>
    );
}