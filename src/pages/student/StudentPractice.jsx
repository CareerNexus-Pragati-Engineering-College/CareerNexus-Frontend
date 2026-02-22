import CodeEditor from "./studentPractice/CodeEditor";
import EditorPage from "./studentPractice/EditorPage";

const studentPractice = () => {

    return (
        <>
            {/* practice */}
            <EditorPage />
            <footer className="w-full bg-gradient-to-r from-[#130c22] via-[#1b1435] to-[#0f0c1d] border-t border-violet-500/20 py-8">
                <div className="container mx-auto px-4 sm:px-8 lg:px-16 text-center text-[#EADFFD] space-y-2 font-outfit">
                    <p className="text-sm sm:text-base opacity-90">
                        &copy; {new Date().getFullYear()} CareerNexus. All rights reserved.
                    </p>
                    <p className="text-xs opacity-60">Your one-stop placement tracker</p>
                </div>
            </footer>
        </>
    )
}

export default studentPractice