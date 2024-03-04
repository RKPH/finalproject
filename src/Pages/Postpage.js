import React from 'react';
import './Postpage.css';

const Postpage = () =>{
    return(
        <main name="main_postPage" className=' pt-[32px] pl-[32px]'>
            <div name="main-header" className='flex flex-row items-center w-[85%] gap-[12px]'>
                <button name="header-popular" className='w-[60px] h-7 px-2 py-1 bg-white rounded-[14px] border border-zinc-900 justify-center items-center inline-flex'>
                    Popular
                </button>
                <button name='header-blockchain' className=' w-[auto] h-7 px-2 py-1 bg-white rounded-[14px] border border-zinc-900 justify-center items-center inline-flex'>
                    Blockchain
                </button>
                <div name="header-date" className="text-zinc-700 text-[11px] font-medium font-['Raleway'] leading-[18px]">Jun 27, 2023</div>
            </div>
            <div name="main-post" className='mt-[28px] w-[95%]'>
                <div name="post-title">
                    <h1 className="w-[636px] text-zinc-900 text-[32px] font-normal font-['Bitter'] leading-[48px]">Demystifying Blockchain: Was it intentionally made confusing?</h1>
                </div>
                <div name="post-user" className='flex flex-row w-[636px] gap-[11px] items-center mt-[24px]'>
                    <div className="w-[42px] h-[42px] bg-zinc-300 rounded-[21px]" />
                    <div name="user-information">
                        <h1 className="text-gray-700 text-sm font-semibold font-['Raleway'] leading-snug">Benjamin Foster</h1>
                        <p className="text-zinc-400 text-[11px] font-normal font-['Raleway'] leading-[18px]">4 min read</p>
                    </div>
                    <button className="w-[50px] h-7 px-2 py-[5px] bg-red-50 rounded-[14px] justify-center items-center inline-flex text-sm">
                        Follow
                    </button>
                </div>
                {/* Post - Information */}
                <div name="post-information" className='mt-[24px] pt-[13px] pb-[13px] flex flex-row justify-between'>
                    <div className='flex flex-row gap-[16px]'>
                        <div className='gap-[4px] flex flex-row'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[24px] h-[24px]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <p className="text-zinc-700 text-base font-light font-['Raleway'] leading-relaxed">1.8M</p>
                        </div>
                        
                        <div className='gap-[4px] flex flex-row'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[24px] h-[24px]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg>
                            <p className="text-zinc-700 text-base font-light font-['Raleway'] leading-relaxed">4K</p>
                        </div>
                    </div>
                    <div className='flex flex-row gap-[12px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[24px] h-[24px]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[24px] h-[24px]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[24px] h-[24px]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                        </svg>
                    </div>
                </div>
                <img src="https://images.igdb.com/igdb/image/upload/t_1080p/sclni3.png" className='mt-[85px]'/>
                <div name="content" className='mt-[55px] text-left flex flex-col'>
                    <div name="content-img" className='gap-[64px] flex flex-col'>
                        <div name="img-text" className="w-[636px] text-zinc-900 text-base font-normal font-['Raleway'] leading-relaxed">Blockchain technology has emerged as a groundbreaking innovation with the potential to revolutionize industries and transform our digital landscape. However, as we delve into the intricacies of blockchain, we often encounter a daunting array of technical terms, complex concepts, and seemingly impenetrable jargon.</div>
                        <div name="img-text" className="w-[636px] text-zinc-900 text-base font-normal font-['Raleway'] leading-relaxed">Blockchain technology has emerged as a groundbreaking innovation with the potential to revolutionize industries and transform our digital landscape. However, as we delve into the intricacies of blockchain, we often encounter a daunting array of technical terms, complex concepts, and seemingly impenetrable jargon.</div>
                    </div>
                    <div name="content-post" className='flex flex-col mt-[86px] mb-[52px] gap-[64px]'>
                        <div>
                            <h1 name='content-title' className="text-zinc-900 text-2xl font-normal font-['Bitter'] leading-9">Unraveling the Complexity</h1>
                            <p name='content-information' className="w-[636px] text-zinc-900 text-sm font-normal font-['Raleway'] leading-snug">At first glance, blockchain can appear as a labyrinth of cryptographic algorithms, consensus mechanisms, and distributed ledgers. The technical nature of blockchain has led many to believe that it was intentionally designed to be confusing, keeping it exclusive to a select few. However, upon closer inspection, we discover that the complexity of blockchain arises from the inherent challenges it seeks to overcome.</p>
                        </div>
                        <div name='list-1' className='flex flex-col gap-[5px]'>
                            <h1 className="text-zinc-900 text-base font-medium font-['Raleway'] leading-relaxed">1. Security and Trust:</h1>
                            <img/>
                            <p className="w-[636px] text-zinc-900 text-sm font-normal font-['Raleway'] leading-snug">Blockchain aims to create a secure and trustworthy system for conducting transactions and storing information. Its complexity is a direct result of the robust security measures and cryptographic protocols it employs. By using advanced encryption techniques and decentralized consensus mechanisms, blockchain ensures the integrity of data and prevents tampering or fraud.</p>
                        </div>
                        <div name='list-2' className='flex flex-col gap-[5px]'>
                            <h1 className="text-zinc-900 text-base font-medium font-['Raleway'] leading-relaxed">1. Security and Trust:</h1>
                            <img/>
                            <p className="w-[636px] text-zinc-900 text-sm font-normal font-['Raleway'] leading-snug">Blockchain aims to create a secure and trustworthy system for conducting transactions and storing information. Its complexity is a direct result of the robust security measures and cryptographic protocols it employs. By using advanced encryption techniques and decentralized consensus mechanisms, blockchain ensures the integrity of data and prevents tampering or fraud.</p>
                        </div>
                        <div name='list-3' className='flex flex-col gap-[5px]'>
                            <h1 className="text-zinc-900 text-base font-medium font-['Raleway'] leading-relaxed">1. Security and Trust:</h1>
                            <img/>
                            <p className="w-[636px] text-zinc-900 text-sm font-normal font-['Raleway'] leading-snug">Blockchain aims to create a secure and trustworthy system for conducting transactions and storing information. Its complexity is a direct result of the robust security measures and cryptographic protocols it employs. By using advanced encryption techniques and decentralized consensus mechanisms, blockchain ensures the integrity of data and prevents tampering or fraud.</p>
                        </div>
                        <div name='list-4' className='flex flex-col gap-[5px]'>
                            <h1 className="w-[306px] text-zinc-900 text-2xl font-normal font-['Bitter'] leading-9">Demystifying Blockchain:</h1>
                            <p className="w-[636px] text-zinc-900 text-sm font-normal font-['Raleway'] leading-snug">While the complexity of blockchain may initially appear intimidating, it is essential to emphasize that understanding blockchain is within reach for anyone willing to explore it. Numerous educational resources, online courses, and communities have emerged to bridge the knowledge gap and make blockchain more accessible.</p>
                            <p className="w-[636px] text-zinc-900 text-sm font-normal font-['Raleway'] leading-snug">To demystify blockchain, breaking down complex concepts into digestible pieces is crucial. By explaining the underlying principles of cryptography, distributed consensus, and data structures, we can empower individuals to grasp the fundamentals. Visualizations, real-world examples, and simplified explanations can also play a vital role in demystifying blockchain and making it more approachable to a wider audience.</p>
                        </div>
                    </div>
                </div>

                
            </div>
        </main>
    )
}

export default Postpage;