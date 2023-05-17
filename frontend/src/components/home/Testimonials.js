import React from 'react'
import test1 from '../../assets/test-1.png'
import test2 from '../../assets/test-2.png'
import test3 from '../../assets/test-3.png'
import test4 from '../../assets/test-4.png'

const Testimonials = () => {

    return (
        <div className="max-w-6xl my-8">
            <h1 className="text-4xl text-center font-bold text-blackk my-14">Testimonials</h1>
            <div className="flex">
                <div className="w-1/2 space-y-4">
                    <div className='flex space-x-3 pr-5 items-center'>
                        <div>
                            <img src={test1} alt="" className='w-80' />
                        </div>
                        <div>
                            <p>
                                "Weemate helped me find my best friend on campus! We have the same major and love to study together." - <strong>Sarah, Junior</strong></p>
                        </div>
                    </div>
                    <div className='flex space-x-3 pr-5 items-center'>
                        <div>
                            <img src={test2} alt="" className='w-80' />
                        </div>
                        <div>
                            <p>

                                "Weemate helped me find my best friend on campus! We have the same major and love to study together." - <strong>leyla, Junior</strong></p>
                        </div>
                    </div>

                </div>
                <div className="w-1/2 space-y-4">
                    <div className='flex space-x-3 pr-5 items-center'>
                        <div>
                            <img src={test3} alt="" className='w-80' />
                        </div>
                        <div>
                            <p>

                                "I joined a study group through Weemate and ended up acing my exam. I couldn't have done it without them!" - <strong>Michael, Sophomore</strong> </p>
                        </div>
                    </div>
                    <div className='flex space-x-3 pr-5 items-center'>
                        <div>
                            <img src={test4} alt="" className='w-80' />
                        </div>
                        <div>
                            <p>

                                "I joined a study group through Weemate and ended up acing my exam. I couldn't have done it without them!" - <strong>Michaeli, Sophomore</strong></p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Testimonials
