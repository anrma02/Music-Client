
import classNames from 'classnames/bind';
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from 'react-icons/ai';
import { BiShuffle } from 'react-icons/bi';
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb';
import { IoRepeatSharp } from 'react-icons/io5';
import Slider from '@mui/material/Slider';
import { useTheme } from '@mui/material/styles';


import style from './Footer.module.scss';

import { useAudio } from '~/Context/AudioProvider';




const cx = classNames.bind(style);



function formatDuration(value) {
     const minute = Math.floor(value / 60);
     const secondLeft = value - minute * 60;
     return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
}



function HandleButton() {
     const {
          isPlaying,
          sliderValue,
          setSliderValue,
          playPauseToggle,
          audioUrl,
          currentTime,
          duration, audioRef,
          initialSeekPosition,
          handleShuffleClick,

          handleNextSong,
          handlePreviousSong, isShuffled
     } = useAudio();


     const theme = useTheme();

     const handPlay = () => {
          playPauseToggle(audioUrl);
     };





     const handleRepeat = () => {
          // Implement logic for repeat click

     };

     const handleSeek = (event, newValue) => {
          audioRef.current.pause();
          setSliderValue(newValue);
     };

     const handleSeekEnd = () => {
          audioRef.current.currentTime = sliderValue || initialSeekPosition;
          if (isPlaying) {
               audioRef.current.play();
          }
     };


     return (
          <>
               <div className={cx('icon-play')}>
                    <button
                         className={cx('button', { 'text-green-500': isShuffled })}
                         onClick={handleShuffleClick}
                    >
                         <BiShuffle className={`text-[24px]  `} />
                    </button>

                    <button onClick={handlePreviousSong}>
                         <TbPlayerTrackPrev className={cx('icon')} />
                    </button>

                    <button onClick={handPlay}>
                         {isPlaying ? (
                              <AiOutlinePauseCircle className={cx('icon')} />
                         ) : (
                              <AiOutlinePlayCircle className={cx('icon')} />
                         )}
                    </button>

                    <button onClick={handleNextSong}>
                         <TbPlayerTrackNext className={cx('icon')} />
                    </button>

                    <button className={cx('button')} onClick={handleRepeat}>
                         <IoRepeatSharp className={`text-[24px]  `} />
                    </button>
               </div>
               <div className={cx('flex justify-center px-2')}>
                    <div className={cx('pr-4 text-[12px] flex items-center text-small text-[#ebeaeac3]')}>
                         {formatDuration(Math.floor(currentTime))}
                    </div>
                    <Slider
                         aria-label="time-indicator"
                         size="small"
                         value={sliderValue}
                         min={0}
                         step={1}
                         max={duration}
                         onChange={handleSeek}
                         onChangeCommitted={handleSeekEnd}
                         onMouseDown={() => audioRef.current.pause()}
                         sx={{
                              color: theme.palette.mode === "#FFFBF5" ? "#7743DB" : "#FFFBF5",
                              height: 2,
                              width: 450,
                              "& .MuiSlider-thumb": {
                                   width: 8,
                                   height: 8,
                                   transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                                   "&:before": {
                                        boxShadow: "0 2px 5px 0 rgba(0,0,0,0.4)",
                                   },
                                   "&:hover, &.Mui-focusVisible": {
                                        boxShadow: `0px 0px 0px 8px ${theme.palette.mode === "dark" ? "#7743DB" : "#7743DB"
                                             }`,
                                   },
                                   "&.Mui-active": {
                                        width: 10,
                                        height: 10,
                                   },
                              },
                              "& .MuiSlider-rail": {
                                   opacity: 0.28,
                              },
                         }}
                    />
                    <div className={cx('pl-4 text-[12px] flex items-center text-[#ebeaeac3]')}>
                         - {formatDuration(Math.floor(duration - currentTime))}
                    </div>
               </div>
          </>
     );
}

export default HandleButton;
