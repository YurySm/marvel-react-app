import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Spinner from '../spinner/Spinner';

import AppHeader from "../appHeader/AppHeader";

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));

const App = () => {

    return (
        // v6
        // <Router>
        //     <div className="app">
        //         <AppHeader/>
        //         <main>
        //             <Routes>
        //                 <Route path='/' element={
        //                 <>
        //                     <ErrorBoundary>
        //                         <RandomChar/>
        //                     </ErrorBoundary>
        //                     <div className="char__content">
        //                         <ErrorBoundary>
        //                             <CharList onCharSelected={onCharSelected}/>
        //                         </ErrorBoundary>
        //                         <ErrorBoundary>
        //                             <CharInfo charId={selectedChar}/>
        //                         </ErrorBoundary>
        //                     </div>
        //                     <img className="bg-decoration" src={decoration} alt="vision"/>
        //                 </>}/>           
        //                 <Route path='/comics' element={
        //                     <>
        //                         <AppBanner />
        //                         <ComicsList />
        //                     </>}/>
        //             </Routes>
        //         </main>
        //     </div>
        // </Router>


        //v5
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Switch> 
                            <Route exact path='/'>
                                <MainPage />
                            </Route>
                            <Route exact path='/comics'>
                                <ComicsPage/>
                            </Route>
                            <Route exact path='/comics/:comicId'>
                                <SingleComicPage/>
                            </Route>
                            <Route path='*'>
                                <Page404 />
                            </Route>
                        </Switch>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;