import React from 'react'
import feature_1 from '../../assets/feature-1.svg'
import feature_2 from '../../assets/feature-2.svg'
import feature_3 from '../../assets/feature-3.svg'
import feature_4 from '../../assets/feature-4.svg'

const Features = () => {
    return (
        <div className="max-w-6xl my-8">
            <h1 className="text-4xl text-center font-bold text-blackk my-14">Features and Benefits</h1>
            <div className="flex justify-evenly space-x-2">
                <div className="flex flex-col-reverse">
                    <div className="feature_card">
                        <img src={feature_1} alt="feature_1" />
                    </div>
                    <p className="mb-8">Meet new friends who share your passions and hobbies.</p>
                </div>
                <div>
                    <div className="feature_card">
                        <img src={feature_2} alt="feature_2" />
                    </div>
                    <p className="mt-8">Meet new friends who share your passions and hobbies.</p>
                </div>
                <div className="flex flex-col-reverse">
                    <div className="feature_card">
                        <img src={feature_3} alt="feature_3" />
                    </div>
                    <p className='mb-8'>Meet new friends who share your passions and hobbies.</p>
                </div>
                <div>
                    <div className="feature_card">
                        <img src={feature_4} alt="feature_4" />
                    </div>
                    <p className='mt-8'>Meet new friends who share your passions and hobbies.</p>
                </div>

            </div>
        </div>
    )
}



export default Features
