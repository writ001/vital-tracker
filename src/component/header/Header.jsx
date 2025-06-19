import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Navigator from '../navigator/Navigator';

const Header = () => {
    const [ham, setHam] = useState(false)
     const page = useSelector((state) => state.vital.page);
    return (
        <>
            {/* Breadcrumb */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center space-x-2 text-sm text-gray-600">
                    <span className="font-semibold text-blue-700">Home</span>
                    <span className="text-blue-700">&gt;</span>
                    <span className="text-blue-700">{page}</span>
                </div>
            </div>
            <button onClick={() => setHam(!ham)} className="sm:hidden text-gray-700 focus:outline-none fixed top-0 right-0 z-50 bg-white mt-2 mr-4">
                <MenuOutlinedIcon color="primary" className="text-2xl" />
                {ham && <Navigator onHam={ham} closeHam={() => setHam(false)} />}
            </button>
        </>
    )
}

export default Header
