import { Constants } from 'expo-constants';
import { Platform } from 'react-native';

function getConfig() {
  if (Constants.ownership === 'standalone') {
    return Platform.select({
      ios: {
        AD_UNIT_ID_FOR_BANNER_TEST: 'ca-app-pub-3940256099942544/2934735716',
        AD_UNIT_ID_FOR_INTERSTITIAL_TEST:
          'ca-app-pub-3940256099942544/4411468910',
        CLIENT_ID:
          '284332687128-kbnpl66oq6a0ejlu8cch43nhhvat1mrp.apps.googleusercontent.com',
        REVERSED_CLIENT_ID:
          'com.googleusercontent.apps.284332687128-kbnpl66oq6a0ejlu8cch43nhhvat1mrp',
        API_KEY: 'AIzaSyAad7NRWVj7HYb6caBCbWV1yOrk37BO49M',
        GCM_SENDER_ID: '284332687128',
        PLIST_VERSION: '1',
        BUNDLE_ID: 'com.bacon.demofirebasemodulesapp',
        PROJECT_ID: 'expo-demo-2e1be',
        STORAGE_BUCKET: 'expo-demo-2e1be.appspot.com',
        IS_ADS_ENABLED: true,
        IS_ANALYTICS_ENABLED: false,
        IS_APPINVITE_ENABLED: false,
        IS_GCM_ENABLED: true,
        IS_SIGNIN_ENABLED: true,
        GOOGLE_APP_ID: '1:284332687128:ios:aa8fb27773dbc409',
        DATABASE_URL: 'https://expo-demo-2e1be.firebaseio.com',
      },
      android: {
        "project_info": {
          "project_number": "284332687128",
          "firebase_url": "https://expo-demo-2e1be.firebaseio.com",
          "project_id": "expo-demo-2e1be",
          "storage_bucket": "expo-demo-2e1be.appspot.com"
        },
        "client": [
          {
            "client_info": {
              "mobilesdk_app_id": "1:284332687128:android:1dc83e5683e4ed30",
              "android_client_info": {
                "package_name": "com.evanbacon.demofirebasemodulesapp"
              }
            },
            "oauth_client": [
              {
                "client_id": "284332687128-b8njdajlnvdrdv4ove617ojuvgm6ve3f.apps.googleusercontent.com",
                "client_type": 3
              }
            ],
            "api_key": [
              {
                "current_key": "AIzaSyBl_6yxl5SZrmjapDD1-3rJvUOVz50ro3c"
              }
            ],
            "services": {
              "analytics_service": {
                "status": 1
              },
              "appinvite_service": {
                "status": 1,
                "other_platform_oauth_client": []
              },
              "ads_service": {
                "status": 2
              }
            }
          },
          {
            "client_info": {
              "mobilesdk_app_id": "1:284332687128:android:0a39df54a288adff",
              "android_client_info": {
                "package_name": "host.exp.Exponent"
              }
            },
            "oauth_client": [
              {
                "client_id": "284332687128-pmvib4j66kj57hoe43dittba3olphvof.apps.googleusercontent.com",
                "client_type": 1,
                "android_info": {
                  "package_name": "host.exp.Exponent",
                  "certificate_hash": "19d8e98daf9754a48f10713212b173622a9984e0"
                }
              },
              {
                "client_id": "284332687128-b8njdajlnvdrdv4ove617ojuvgm6ve3f.apps.googleusercontent.com",
                "client_type": 3
              }
            ],
            "api_key": [
              {
                "current_key": "AIzaSyBl_6yxl5SZrmjapDD1-3rJvUOVz50ro3c"
              }
            ],
            "services": {
              "analytics_service": {
                "status": 1
              },
              "appinvite_service": {
                "status": 2,
                "other_platform_oauth_client": [
                  {
                    "client_id": "284332687128-b8njdajlnvdrdv4ove617ojuvgm6ve3f.apps.googleusercontent.com",
                    "client_type": 3
                  },
                  {
                    "client_id": "284332687128-je9h9j3r5gnhojb34j4f6rnu93kgp344.apps.googleusercontent.com",
                    "client_type": 2,
                    "ios_info": {
                      "bundle_id": "com.evanbacon.demofirebasemodulesapp"
                    }
                  }
                ]
              },
              "ads_service": {
                "status": 2
              }
            }
          }
        ],
        "configuration_version": "1"
      },
    });
  } else {
    return Platform.select({
      ios: {
        AD_UNIT_ID_FOR_BANNER_TEST: 'ca-app-pub-3940256099942544/2934735716',
        AD_UNIT_ID_FOR_INTERSTITIAL_TEST:
          'ca-app-pub-3940256099942544/4411468910',
        CLIENT_ID:
          '284332687128-56bt6qda9slfm0p0qi3v9g1mjbo05vp2.apps.googleusercontent.com',
        REVERSED_CLIENT_ID:
          'com.googleusercontent.apps.284332687128-56bt6qda9slfm0p0qi3v9g1mjbo05vp2',
        API_KEY: 'AIzaSyAad7NRWVj7HYb6caBCbWV1yOrk37BO49M',
        GCM_SENDER_ID: '284332687128',
        PLIST_VERSION: '1',
        BUNDLE_ID: 'bacon.host.exp.nclexp',
        PROJECT_ID: 'expo-demo-2e1be',
        STORAGE_BUCKET: 'expo-demo-2e1be.appspot.com',
        IS_ADS_ENABLED: true,
        IS_ANALYTICS_ENABLED: false,
        IS_APPINVITE_ENABLED: false,
        IS_GCM_ENABLED: true,
        IS_SIGNIN_ENABLED: true,
        GOOGLE_APP_ID: '1:284332687128:ios:d430edda7e793956',
        DATABASE_URL: 'https://expo-demo-2e1be.firebaseio.com',
      },
      android: {
        project_info: {
          project_number: '284332687128',
          firebase_url: 'https://expo-demo-2e1be.firebaseio.com',
          project_id: 'expo-demo-2e1be',
          storage_bucket: 'expo-demo-2e1be.appspot.com',
        },
        client: [
          {
            client_info: {
              mobilesdk_app_id: '1:284332687128:android:0a39df54a288adff',
              android_client_info: {
                package_name: 'host.exp.Exponent',
              },
            },
            oauth_client: [
              {
                client_id:
                  '284332687128-pmvib4j66kj57hoe43dittba3olphvof.apps.googleusercontent.com',
                client_type: 1,
                android_info: {
                  package_name: 'host.exp.Exponent',
                  certificate_hash: '19d8e98daf9754a48f10713212b173622a9984e0',
                },
              },
              {
                client_id:
                  '284332687128-b8njdajlnvdrdv4ove617ojuvgm6ve3f.apps.googleusercontent.com',
                client_type: 3,
              },
            ],
            api_key: [
              {
                current_key: 'AIzaSyBl_6yxl5SZrmjapDD1-3rJvUOVz50ro3c',
              },
            ],
            services: {
              analytics_service: {
                status: 1,
              },
              appinvite_service: {
                status: 2,
                other_platform_oauth_client: [
                  {
                    client_id:
                      '284332687128-b8njdajlnvdrdv4ove617ojuvgm6ve3f.apps.googleusercontent.com',
                    client_type: 3,
                  },
                  {
                    client_id:
                      '284332687128-lnbiokj7vmegn3ci507b4oqsr4s8bhum.apps.googleusercontent.com',
                    client_type: 2,
                    ios_info: {
                      bundle_id: 'host.exp.Exponent',
                      app_store_id: '982107779',
                    },
                  },
                ],
              },
              ads_service: {
                status: 2,
              },
            },
          },
        ],
        configuration_version: '1',
      },
    });
  }
}

export default getConfig;
