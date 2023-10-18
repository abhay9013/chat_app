import TimeAgo from 'timeago-react';
import { Button } from 'rsuite';
import { memo } from 'react';
import { auth } from '../../../misc/firebase';
import { useHover } from '@uidotdev/usehooks';

import ProfileAvatar from '../../ProfileAvatar';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';
import PresenceDot from '../../PresenceDot';
import { useCurrentRoom } from '../../../context/currentroomcontext';
import { useMediaQuery } from '../../../misc/custom-hooks';
import IconBtnControl from './IconBtnControl';

const MessageItem = ({ message, handleAdmin, handleLike, handleDelete }) => {
  const { author, createdAt, text, likes, likeCount } = message;

  const [selfRef, isHovered] = useHover();

  const isAdmin = useCurrentRoom(v => v.isAdmin);
  const admins = useCurrentRoom(v => v.admins);

  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;

  const canGrantAdmin = isAdmin && !isAuthor;

  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);
  //if it is liked bu curr user or not

  const isMobile = useMediaQuery('(max-width: 992px)');
  const canShowIcons = isMobile || isHovered;

  return (
    <li
      className={`padded mb-1 cursor-pointer ${
        isHovered ? 'bg-black-02' : ''
      } `}
      ref={selfRef}
    >
      <div className="d-flex align-items-center font-bolder mb-1">
        <PresenceDot uid={author.uid} />
        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        />

        <ProfileInfoBtnModal
          profile={author}
          appearance="link"
          className="p-0 ml-0 text-black"
        >
          {canGrantAdmin && (
            <Button block onClick={() => handleAdmin(author.uid)} color="blue">
              {isMsgAuthorAdmin
                ? 'Remove admin permission'
                : 'Give admin in this room'}
            </Button>
          )}
        </ProfileInfoBtnModal>

        <TimeAgo datetime={createdAt} className="font-normal text-black ml-2" />

        <IconBtnControl
          {...(isLiked ? { color: 'red' } : {})}
          isVisible={canShowIcons}
          iconName="heart"
          tooltip="Like the message"
          onClick={() => handleLike(message.id)}
          badgeContent={likeCount}
        />
        {isAuthor && (
          <IconBtnControl
            isVisible={canShowIcons}
            iconName="close"
            tooltip="Delete the message"
            onClick={() => handleDelete(message.id)}
          />
        )}
      </div>
      <div>
        <span className="word-breal-all">{text}</span>
      </div>
    </li>
  );
};

export default memo(MessageItem);
