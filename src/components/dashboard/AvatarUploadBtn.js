import { Alert, Button, Modal } from 'rsuite';
import AvatarEditor from 'react-avatar-editor';
import { useRef, useState } from 'react';

import { useModalState } from '../../misc/custom-hooks';
import { useProfile } from '../../context/profilecontext';
import { database, storage } from '../../misc/firebase';
import ProfileAvatar from '../ProfileAvatar';

const fileInputTypes = '.png, .jpeg, .jpg';
const acceptedFilesTypes = ['image/png', 'image/jpeg', 'image/jpg'];
const isValidFile = file => acceptedFilesTypes.includes(file.type);

const getBlob = canvas => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('File Process Error'));
      }
    });
  });
};

const AvatarUploadBtn = () => {
  const { isOpen, open, close } = useModalState();
  const { profile } = useProfile();

  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const AvatarEditorRef = useRef();

  const onFileInputChange = ev => {
    const currfiles = ev.target.files;

    if (currfiles.length === 1) {
      const file = currfiles[0];
      if (isValidFile(file)) {
        setImage(file);
        open();
      } else {
        Alert.warning(`Wrong file type ${file.type}`, 4000);
      }
    }
  };

  const onUploadClick = async () => {
    setIsLoading(true);
    const canvas = AvatarEditorRef.current.getImageScaledToCanvas();
    try {
      const blob = await getBlob(canvas);

      const avatarFileRef = storage
        .ref(`/profile/${profile.uid}`)
        .child('avatar');

      const uploadAvatarResult = await avatarFileRef.put(blob, {
        cacheControl: `public,max-age=${3600 * 24 * 3}`,
      });

      const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();

      const useAvatarRef = database
        .ref(`/profiles/${profile.uid}`)
        .child('avatar');

      useAvatarRef.set(downloadUrl);

      setIsLoading(false);
      Alert.info('Avatar has been uploaded', 4000);
    } catch (err) {
      setIsLoading(false);
      Alert.error(err.message, 4000);
    }
  };
  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        src={profile.avatar}
        name={profile.name}
        className="width-200 height-200 img-fullsize font-huge"
      />

      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select new avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={fileInputTypes}
            onChange={onFileInputChange}
          />
        </label>

        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Adjust and upload new avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center h-100">
              {image && (
                <AvatarEditor
                  ref={AvatarEditorRef}
                  image={image}
                  width={200}
                  height={200}
                  border={50}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              block
              appearance="ghost"
              onClick={onUploadClick}
              disabled={isLoading}
            >
              Upload new Avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadBtn;
