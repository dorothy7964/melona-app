# 올 때 메로나
소액 대행 서비스 프로젝트 입니다. <br/><br/>
[backend Github 바로가기](https://github.com/dorothy7964/melona-backend "backend Github 바로가기") <br/>
[frontend Github 바로가기](https://github.com/dorothy7964/melona_frontend "frontend Github 바로가기") 

<br/><br/>

### 주요 기능
1. Preloading Assets
2. Preloading Cache
3. 기기에 맞는 호환
4. 전/후면 카메라 촬영
5. 갤러리 사진 가져오기
6. 화면 아래로 당겨서 새로고침

<br/><br/>

### App Stack
- React Native
- React Hooks
- Expo
- Apollo
- styled-components

<br/><br/>

# Expo를 통한 프로젝트 생성 및 설치

### Expo 설치

<!-- Install Code -->

``` js
// yarn 으로 설치 할 경우
yarn global add expo-cli

// npm 으로 설치 할 경우
npm install expo-cli-g 
```

<br/>

### 프로젝트 생성

<!-- Example Code -->

``` js
expo init 프로젝트명
```

<br/>

**sdkVersion 설치 안 되어 있을 경우**


<!-- Install Code -->

``` js
$ expo init --template expo-template-blank@sdk-35
```

<br/>

### 설명

<!-- Example Code -->

``` js
// ~/wam-prj/melona-app/app.json

{
  "expo": {
    "name": "melona-app",
    "slug": "melona-app",
    "privacy": "public",
    "sdkVersion": "35.0.0",     //sdkVersion 설치 확인
    "platforms": [
      "ios",
      "android",
      "web"
    ],
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    }
  }
}
```

3개의 플랫폼(iOS, android, web)에서 일하는 게 가능하게 합니다. <br/>

<br/>

### Install

- styled-components
- react-navigation
- apollo-boost
- graphql
- react-apollo-hooks

<!-- Install Code -->

``` js
$ yarn add styled-components react-navigation
$ yarn add apollo-boost graphql
$ yarn add react-apollo-hooks
```

**apollo-boost 패키지**

- `apollo-client`

    : 모든 마술이 일어나는 곳

- `apollo-cache-inmemory`

    : 권장 캐시

- `apollo-link-http`

    : 원격 데이터 가져 오기를위한 Apollo Link

- `apollo-link-error`

    : 오류 처리를위한 아폴로 링크

- `graphql-taggql`

    : 쿼리 및 돌연변이에 대한 기능을 내 보냅니다.

<br/><br/>

# Preloading Assets

Expo의 assets을 사용해서 로고나 이미지 또는 폰트를 preload 하며 사용자가 스크린에 가서야 로고나 이미지 또는 폰트가 나오는 것을 방지 합니다.

<br/>

### Expo Library 설치

**vector-icons 설치**

<!-- Install Code -->

``` js
$ yarn add @expo/vector-icons
```

<br/>

**font, asset 설치**

<!-- Install Code -->

``` js
$ expo install expo-font
$ expo install expo-asset
```

<br/>

### AppLoading 추가 및 흐름 설명

<!-- Example Code -->

``` js
// ~/wam-prj/melona-app/App.js

import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // Icon preloading 하기
import { AppLoading } from "expo";
import { Text, View } from 'react-native';

export default function App() {
  return <AppLoading />;
}

```

AppLoading 는 return 했을 때 앱이 계속 로딩하는 componenet 입니다. <br/>
항상 uploading을 리턴하는걸 원하지 않기 때문에 아래처럼 만들어 주기. <br/>
uploading 은 모든게 안 됐을 때 작동하게 할 거고 이걸 위해 state 를 만들어주기

<br/>


<!-- Example Code -->

``` js
// ~/wam-prj/melona-app/App.js

import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from "expo";
import { Text, View } from 'react-native';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return loaded? (
    <View>
      <Text>Open Up!</Text>
    </View>
  ) : (
    <AppLoading />
  );
}
```
change loaded 가 true 가 되도록 하지 않았습니다. <br/>
여기는 preloading 이 시작되는 부분이다.

<br/>

**preLoad 함수와 useEffect 만들어주기**

<!-- Example Code -->

``` js
// ~/wam-prj/melona-app/App.js

import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from "expo";
import { Text, View } from 'react-native';

export default function App() {
    const [loaded, setLoaded] = useState(false);
    
    const preLoad = () => {
        setLoaded(true);
    };

    useEffect(() => {
        preLoad();
    }, []);

    return loaded ? (
        <View>
            <Text>Open Up!</Text>
        </View>
    ) : (
        <AppLoading />
    );
}
```
 useEffect 함수가 실행되고 마운트가 되면 preLoad를 호출하게되어 setLoaded(true) 가 작동하면서 로드 됩니다.

<br/>

### font Loading 하기

<!-- Example Code -->

``` js
// ~/wam-prj/melona-app/App.js

import * as Font from 'expo-font';

export default function App() {
  const preLoad = async() => {
      try {
        await Font.loadAsync({
          ...Ionicons.font
        });
        setLoaded(true);
      } catch (e) {
        console.log(e);
      }     
  };
 <!-- 생략 -->
}
```

<br/>

### Logo Loading 하기

<!-- Example Code -->

``` js
// ~/wam-prj/melona-app/App.js

import * as Font from 'expo-font';
import { Asset } from 'expo-asset'

export default function App() {
  const preLoad = async() => {
      try {
        await Font.loadAsync({
          ...Ionicons.font
        });
        await Asset.loadAsync(require("./assets/logo.png"));
        setLoaded(true);
      } catch (e) {
        console.log(e);
      }     
  };
 <!-- 생략 -->
}
```

<br/><br/>

# Preloading Cache

Apollo의 memory를 사용하여 사용자가 이전에 사용한 데이터가 있을 경우 복사해
cache 에 넣어주어 다시 애플리케이션을 들어올 때 업로딩 되지 않고 사용자가
쓰던 데이터가 보이도록 만들어 주었습니다.

<br/>

### apollo cache persist 설치

<!-- Install Code -->

``` js
$ yarn add apollo-cache-persist
$ yarn add apollo-cache-inmemory
```

<br/>

### apollo client options object 만들기

<!-- Example Code -->

``` js
// ~/wam-prj/melona-app/App.js

import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset'
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from "expo";
// (1) import 해주자.
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCache } from "apollo-cache-persist";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-boost"; // 우리 client 가 될거다.


export default function App() {
  const [loaded, setLoaded] = useState(false);
  
  const preLoad = async() => {
    try {
      await Font.loadAsync({
        ...Ionicons.font
      });
      await Asset.loadAsync(require("./assets/logo.png"));
        
      // (2) 먼저 cache 를 만들자
      // memory cache 가 된다.
      const cache = new InMemoryCache();

      // (3) async storage 를 이용해서 persist 로 만든다.
      await persistCache({
        cache,
        storage: AsyncStorage,
      });

      // (4) apollo client가 될 cache를 가진 client 만들기 
      const client = new ApolloClient({
        cache
      });

      setLoaded(true);
    } catch (e) {
      console.log(e);
    }     
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loaded? (
    <View>
      <Text>Open Up!</Text>
    </View>
  ) : (
    <AppLoading />
  );
}
```

InMemoryCache과 같이 객체를 만들어 ApolloClient생성자에 제공합니다 .

<br/>

**apollo client optoin 만들기**

<!-- Example Code -->

``` js
// ~/wam-prj/melona-app/App.js

import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset'
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from "expo";
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCache } from "apollo-cache-persist";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-boost";
import apolloClientOptions from "./apollo"; // 추가

export default function App() {
  const [loaded, setLoaded] = useState(false);
  
  const preLoad = async() => {
      try {
        await Font.loadAsync({
          ...Ionicons.font
        });
        await Asset.loadAsync(require("./assets/logo.png"));
        const cache = new InMemoryCache();
        await persistCache({
          cache,
          storage: AsyncStorage,
        });
        const client = new ApolloClient({
          cache,
          ...apolloClientOptions    // 추가
        });
        setLoaded(true);
      } catch (e) {
        console.log(e);
      }     
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loaded? (
    <View>
      <Text>Open Up!</Text>
    </View>
  ) : (
    <AppLoading />
  );
}
```
<br/><br/>

### state 에 client 만들기

<!-- Example Code -->

``` js
// ~/wam-prj/melona-app/App.js

import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset'
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from "expo";
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCache } from "apollo-cache-persist";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-boost";
import apolloClientOptions from "./apollo";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);   // 추가
  
  const preLoad = async() => {
      try {
        await Font.loadAsync({
          ...Ionicons.font
        });
        await Asset.loadAsync(require("./assets/logo.png"));
        const cache = new InMemoryCache();
        await persistCache({
          cache,
          storage: AsyncStorage,
        });
        const client = new ApolloClient({
          cache,
          ...apolloClientOptions
        });
        setLoaded(true);
        setClient(client);   // 추가
      } catch (e) {
        console.log(e);
      }     
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client ? (
    <View>
      <Text>Open Up!</Text>
    </View>
  ) : (
    <AppLoading />
  );
}
```

<br/><br/>

### Provider 만들기

<!-- Example Code -->

``` js
// ~/wam-prj/melona-app/App.js

import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset'
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from "expo";
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCache } from "apollo-cache-persist";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-boost";   // 추가
import { ApolloProvider } from 'react-apollo-hooks';
import apolloClientOptions from "./apollo";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  
  const preLoad = async() => {
      try {
        await Font.loadAsync({
          ...Ionicons.font
        });
        await Asset.loadAsync(require("./assets/logo.png"));
        const cache = new InMemoryCache();
        await persistCache({
          cache,
          storage: AsyncStorage,
        });
        const client = new ApolloClient({
          cache,
          ...apolloClientOptions
        });
        setLoaded(true);
        setClient(client);
      } catch (e) {
        console.log(e);
      }     
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client ? (
    <ApolloProvider client={client}> <!-- 추가 -->
      <View>
        <Text>Open Up!</Text>
      </View>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
```

<br/><br/>

# 기기에 맞는 호환

### `@expo/vector-icons`아이콘 연결하기

<!-- Example Colde -->

``` js
import React from "react";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";

const NavIcon = ({
    focused = true,
    name,
    color = styles.melonaColor,
    size = 30
}) => (
    <Ionicons
        name={name}
        color={focused ? color : styles.darkGreyColor}
        size={size}
    />
);

NavIcon.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
    focused: PropTypes.bool
};

export default NavIcon;
```

<br/>

### Platform.OS 조건부에 맞게 아이콘 보이기

``` js
import { Platform } from "react-native";

<NavIcon
    focused={false}
    name={Platform.OS === "ios" 
        ? "ios-arrow-back" 
        : "md-arrow-back"
    }
/>
```

<br/><br/>

# 사진 선택

### MediaLibrary 설치

<!-- Install Code -->

``` js
$ expo install expo-media-library
```

<br/>

``` js
import * as MediaLibrary from 'expo-media-library';
```

- MediaLibrary : 라이브러리로부터 모든 사진을 가져 올 수 있습니다.

- Permissions,CAMERA ROLL 권한이 필요 합니다.

<br/>

### permissions 설치

<!-- Install Code -->

```js
$ expo install expo-permissions
```

Permission : 권한 요청 같은 것을 할 수 있게 해준다.

<br/>

### 사용자에게 권한 요청하기

<!-- Example Code -->

``` js
import React, { useState, useEffect } from "react";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";

export default ({ navigation }) => {
  const askPermission = async () => {
      try {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if(status === "granted"){
              setHasPermission(true);
              getPhotos();
           }
      } catch(e) {
          console.log(e);
          setHasPermission(false);
      }
  };

  useEffect(() => {
      askPermission();
  }, []);

  return (
    <View>
        {loading? (
            <Loader />
        ) : (
            <View>
                <Text>{hasPermission? "권한 수락" : "권한 거부"}</Text>
            </View>
        )}
    </View>
  );
};
```

**참고**

- ios 권한 허용을 '허용하지 않음' 으로 눌렀다면 다시 묻지 않습니다다.

- 앱 설정으로 가서 수동으로 허용해 줘야 한다.

<br/><br/>

# 카메라 촬영


### Expo Camera 설치

<!-- Install Code -->

``` js
$ expo install expo-camera
```

<br/>

### 권한 요청

``` js
// ~/wam-prj/melona-app/components/TakePhoto.js

import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import styled from "styled-components";

const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Text = styled.Text``;

export default () => {
    const [loading, setLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);

    const askPermission = async () => {
        try {
          const { status } = await Permissions.askAsync(Permissions.CAMERA);
          if(status === "granted"){
            setHasPermission(true);
          }
        } catch(e) {
          console.log(e);
          setHasPermission(false);
        } finally {
            setLoading(false);
        }
      };
    
      useEffect(() => {
        askPermission();
      }, []);
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("Upload")}>
                <Text>take</Text>
            </TouchableOpacity>
        </View>
    );
};
```

카메라에는 사용 권한이 필요합니다.

<br/>

### 카메라 적용

<!-- Example Code -->

``` js
// ~/wam-prj/melona-app/screens/Photo/TakePhoto.js

import React, { useState, useEffect } from "react";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import styled from "styled-components";
import Loader from "../../components/Loader";
import constants from "../../constants";

const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Text = styled.Text``;

export default () => {
    const [loading, setLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);

    const askPermission = async () => {
        try {
          const { status } = await Permissions.askAsync(Permissions.CAMERA);
          if(status === "granted"){
            setHasPermission(true);
          }
        } catch(e) {
          console.log(e);
          setHasPermission(false);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
      askPermission();
    }, []);

    return (
        <View>
            {loading ? (
              <Loader />
            ) : hasPermission ? (
                <Camera 
                    style={{
                        width:constants.width,
                        height:constants.height / 2,
                    }}
                />
            ) : null}
        </View>
    );
};
```

<br/>

### 전/후면 카메라 전환

<!-- Example Code -->

``` js
// ~/wam-prj/melona-app/screens/Photo/TakePhoto.js

import React, { useState, useEffect } from "react";
import { TouchableOpacity, Platform } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { Ionicons } from '@expo/vector-icons';
import styled from "styled-components";
import Loader from "../../components/Loader";
import constants from "../../constants";
import styles from "../../styles";

const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export default () => {
    const [loading, setLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);   // 카메라 전환 타입

    const askPermission = async () => {
        try {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            if(status === "granted"){
                setHasPermission(true);
            }
        } catch(e) {
            console.log(e);
            setHasPermission(false);
        } finally {
            setLoading(false);
        }
    };

    //    // 카메라 전환 타입
    const toggleType = () => {
        if (cameraType === Camera.Constants.Type.front){
            setCameraType(Camera.Constants.Type.back);  
        } else {
            setCameraType(Camera.Constants.Type.front);  
        }
    };
    
    useEffect(() => {
        askPermission();
    }, []);

    return (
        <View>
            {loading ? (
              <Loader />
            ) : hasPermission ? (
                <React.Fragment>
                    <Camera 
                       type={cameraType} 
                        style={{
                            width:constants.width,
                            height:constants.height / 2,
                            justifyContent: "flex-end",
                            padding: 15
                        }}
										>
	                    <TouchableOpacity onPress={toggleType}>
	                        <Ionicons 
	                            name={Platform.OS === "ios" 
	                                ? "ios-reverse-camera" 
	                                : "md-reverse-camera"
	                            } 
	                            size={28} 
	                            color={styles.blackColor}/>
	                    </TouchableOpacity>
                  </Camera>
                </React.Fragment>
            ) : null}
        </View>
    );
};
```

<br/>

### 촬영 버튼

**Methods**

``` js
// ...
<Camera
  ref={ref => {
    this.camera = ref;
  }}
/>;
// ...
snap = async () => {
  if (this.camera) {
    let photo = await this.camera.takePictureAsync();
  }
```

카메라가 노출하는 메소드를 사용하려면 컴포넌트를 작성하고 ref이를 사용하여 호출해야합니다.

<br/>

`takePictureAsync()`

``` js
const takePhoto = async() => {
    const photo = await cameraRef.current.takePictureAsync({
        quality: 1
    });
    console.log(photo);
};
```

- 사진을 찍어 앱의 캐시 디렉토리에 저장합니다. 
- 장치의 방향에 맞게 사진이 회전되고 
( options.skipProcessing 플래그가 활성화되지 않은 경우 ) 미리보기에 맞게 크기가 조정됩니다. 
- 안드로이드 ratio에서 올바른 크기의 그림을 얻으려면 소품을 설정 해야합니다.

<br/><br/>

# 화면 아래로 당겨서 새로고침

<!-- Example Code -->

``` js
// ~/wam-prj/melona-app/screens/Tabs/Daddy.js

import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";

const SEE_BUY = gql`
    query seeBuy ($items: Int $pageNumber: Int) {
        seeBuy (items: $items, pageNumber: $pageNumber) {
            id
            location
            lastDate
            isApply
            isApplyWait
            isApplyReadCheck
            applysCount
            commentCount
            viewApply
            anotherPage
            applys {
                id
                apply
                readCheck
                user {
                    userName
                    avatar
                }
            }
            user {
                userName
                avatar
                isSelf
           }
            categorys {
                id
                text
            }
        }
    }
`;

const Text = styled.Text``;

export default () => {
    const [refreshing, setRefreshing] = useState(false);
    const { data, loading, refetch } = useQuery(SEE_BUY);
    
    const refresh = async () => {
        try {
            setRefreshing(true);
            await refetch();
        } catch (e) {
            console.log(e);
        } finally {
            setRefreshing(false);
        }
    };
    
    return (
        <ScrollView 
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }
        >
            {loading
                ?   <Loader /> 
                :   <Text>Hello</Text>
            }
        </ScrollView>
    );
};
```

<br/><br/>