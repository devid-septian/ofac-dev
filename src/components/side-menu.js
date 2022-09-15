import React from 'react'
import { useRouter } from 'next/router'
import Accordion from 'react-bootstrap/Accordion'
import NextLink from 'next/link'

export default function SideMenu({ privilege }) {
    const { asPath } = useRouter()
    return (
        <div className="side-menu">
            <div className="side-head">
                <h2>OFAC App - Merchant</h2>
            </div>
            <div className="menu">
                <ul>
                    <li className={asPath === '/dashboard' ? 'active' : ''}>
                        <NextLink href="/dashboard">
                            <a>
                                <svg
                                    width="38"
                                    height="40"
                                    viewBox="0 0 38 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M34.3188 15.0625C33.4842 12.9832 32.2744 11.0942 30.7563 9.5C29.2418 7.90199 27.4472 6.62845 25.4719 5.75C23.4197 4.83594 21.2451 4.375 19 4.375C16.7549 4.375 14.5803 4.83594 12.5281 5.75C10.5528 6.62845 8.75821 7.90199 7.24375 9.5C5.72564 11.0942 4.51578 12.9832 3.68125 15.0625C2.81289 17.2227 2.375 19.5117 2.375 21.875C2.375 27.0586 4.53848 31.9414 8.30879 35.2773L8.37188 35.332C8.58711 35.5195 8.85801 35.625 9.13633 35.625H28.8674C29.1457 35.625 29.4166 35.5195 29.6318 35.332L29.6949 35.2773C33.4615 31.9414 35.625 27.0586 35.625 21.875C35.625 19.5117 35.1834 17.2227 34.3188 15.0625ZM28.2551 32.6562H9.74492C8.311 31.2953 7.16496 29.6322 6.38117 27.7748C5.59738 25.9174 5.19335 23.9074 5.19531 21.875C5.19531 17.9922 6.63145 14.3438 9.24023 11.6016C11.849 8.85547 15.315 7.34375 19 7.34375C22.6887 7.34375 26.1547 8.85547 28.7598 11.6016C31.3686 14.3477 32.8047 17.9961 32.8047 21.875C32.8047 26 31.1533 29.9023 28.2551 32.6562ZM23.1377 16.4648C23.0819 16.4067 23.0065 16.3741 22.928 16.3741C22.8495 16.3741 22.7742 16.4067 22.7184 16.4648L19.5826 19.7656C18.8887 19.5703 18.1205 19.7578 17.575 20.332C17.3818 20.535 17.2285 20.7761 17.1239 21.0416C17.0193 21.307 16.9655 21.5915 16.9655 21.8789C16.9655 22.1663 17.0193 22.4508 17.1239 22.7162C17.2285 22.9817 17.3818 23.2228 17.575 23.4258C17.7679 23.6292 17.9969 23.7905 18.2491 23.9006C18.5012 24.0107 18.7715 24.0674 19.0445 24.0674C19.3175 24.0674 19.5878 24.0107 19.84 23.9006C20.0922 23.7905 20.3212 23.6292 20.5141 23.4258C20.7725 23.1545 20.9584 22.8163 21.0529 22.4452C21.1473 22.0742 21.1471 21.6834 21.0521 21.3125L24.1879 18.0117C24.3029 17.8906 24.3029 17.6914 24.1879 17.5703L23.1377 16.4648ZM18.1836 12.5H19.8164C19.9797 12.5 20.1133 12.3594 20.1133 12.1875V9.0625C20.1133 8.89062 19.9797 8.75 19.8164 8.75H18.1836C18.0203 8.75 17.8867 8.89062 17.8867 9.0625V12.1875C17.8867 12.3594 18.0203 12.5 18.1836 12.5ZM27.832 21.0156V22.7344C27.832 22.9062 27.9656 23.0469 28.1289 23.0469H31.0977C31.2609 23.0469 31.3945 22.9062 31.3945 22.7344V21.0156C31.3945 20.8438 31.2609 20.7031 31.0977 20.7031H28.1289C27.9656 20.7031 27.832 20.8438 27.832 21.0156ZM28.3033 13.3125L27.1492 12.0977C27.0934 12.0395 27.0181 12.0069 26.9396 12.0069C26.861 12.0069 26.7857 12.0395 26.7299 12.0977L24.6295 14.3086C24.5742 14.3673 24.5432 14.4466 24.5432 14.5293C24.5432 14.612 24.5742 14.6913 24.6295 14.75L25.7836 15.9648C25.8986 16.0859 26.0879 16.0859 26.2029 15.9648L28.3033 13.7539C28.4184 13.6328 28.4184 13.4336 28.3033 13.3125ZM11.285 12.0977C11.2292 12.0395 11.1538 12.0069 11.0753 12.0069C10.9968 12.0069 10.9214 12.0395 10.8656 12.0977L9.71152 13.3125C9.65627 13.3712 9.62528 13.4505 9.62528 13.5332C9.62528 13.6159 9.65627 13.6952 9.71152 13.7539L11.8119 15.9648C11.927 16.0859 12.1162 16.0859 12.2312 15.9648L13.3854 14.75C13.5004 14.6289 13.5004 14.4297 13.3854 14.3086L11.285 12.0977ZM9.72266 20.7031H6.75391C6.59062 20.7031 6.45703 20.8438 6.45703 21.0156V22.7344C6.45703 22.9062 6.59062 23.0469 6.75391 23.0469H9.72266C9.88594 23.0469 10.0195 22.9062 10.0195 22.7344V21.0156C10.0195 20.8438 9.88594 20.7031 9.72266 20.7031Z"
                                        fill={
                                            asPath === '/dashboard'
                                                ? 'white'
                                                : 'black'
                                        }
                                    />
                                </svg>
                                Dashboard
                            </a>
                        </NextLink>
                    </li>
                    <li>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Data Proses</Accordion.Header>
                                <Accordion.Body>
                                    <ul>
                                        {privilege.includes('Upload Data') && (
                                            <li
                                                className={
                                                    asPath === '/upload-data'
                                                        ? 'active'
                                                        : ''
                                                }
                                            >
                                                <NextLink href="/upload-data">
                                                    <a>
                                                        <svg
                                                            width="36"
                                                            height="30"
                                                            viewBox="0 0 36 30"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M9.9135 3.65999C12.1623 1.30946 15.0305 0.0112868 18 0C24.0525 0 29.0768 5.45454 29.6235 12.4882C33.2055 13.1018 36 16.7372 36 21.199C36 26.0972 32.6295 29.9999 28.5457 29.9999H22.5C22.2016 29.9999 21.9155 29.8563 21.7045 29.6005C21.4935 29.3448 21.375 28.998 21.375 28.6363C21.375 28.2747 21.4935 27.9278 21.7045 27.6721C21.9155 27.4163 22.2016 27.2727 22.5 27.2727H28.548C31.4527 27.2727 33.75 24.5127 33.75 21.199C33.75 17.8827 31.455 15.1227 28.5457 15.1227H27.4207V13.7591C27.423 7.70453 23.238 2.72727 18 2.72727C15.5697 2.73903 13.2229 3.80299 11.3827 5.72726C9.6795 7.50544 8.7885 9.64907 8.7885 11.3318V12.5536L7.78725 12.6872C4.644 13.1045 2.25 16.2327 2.25 19.9581C2.25 23.959 5.0175 27.2727 8.50725 27.2727H13.5C13.7984 27.2727 14.0845 27.4163 14.2955 27.6721C14.5065 27.9278 14.625 28.2747 14.625 28.6363C14.625 28.998 14.5065 29.3448 14.2955 29.6005C14.0845 29.8563 13.7984 29.9999 13.5 29.9999H8.50725C3.843 29.9999 0 25.5436 0 19.9581C0 15.15 2.8485 11.1682 6.6195 10.1591C6.94125 7.80544 8.19 5.45999 9.9135 3.65999Z"
                                                                fill="black"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M17.4692 12.219C17.5389 12.1492 17.6216 12.0938 17.7128 12.056C17.8039 12.0181 17.9016 11.9987 18.0002 11.9987C18.0989 11.9987 18.1965 12.0181 18.2877 12.056C18.3788 12.0938 18.4615 12.1492 18.5312 12.219L23.0312 16.719C23.172 16.8598 23.2512 17.0509 23.2512 17.25C23.2512 17.4492 23.172 17.6402 23.0312 17.781C22.8904 17.9218 22.6994 18.001 22.5002 18.001C22.3011 18.001 22.11 17.9218 21.9692 17.781L18.7502 14.5605V27.75C18.7502 27.9489 18.6712 28.1397 18.5305 28.2803C18.3899 28.421 18.1991 28.5 18.0002 28.5C17.8013 28.5 17.6105 28.421 17.4699 28.2803C17.3292 28.1397 17.2502 27.9489 17.2502 27.75V14.5605L14.0312 17.781C13.8904 17.9218 13.6994 18.001 13.5002 18.001C13.3011 18.001 13.11 17.9218 12.9692 17.781C12.8284 17.6402 12.7493 17.4492 12.7493 17.25C12.7493 17.0509 12.8284 16.8598 12.9692 16.719L17.4692 12.219Z"
                                                                fill="black"
                                                            />
                                                        </svg>
                                                        Upload Data
                                                    </a>
                                                </NextLink>
                                            </li>
                                        )}
                                        {privilege.includes('Searching') && (
                                            <li
                                                className={
                                                    asPath ===
                                                    '/screening-merchant'
                                                        ? 'active'
                                                        : ''
                                                }
                                            >
                                                <NextLink href="/screening-merchant">
                                                    <a>
                                                        <svg
                                                            width="33"
                                                            height="33"
                                                            viewBox="0 0 33 33"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M24.2188 21.3329C26.2158 18.6074 27.1103 15.2283 26.7232 11.8715C26.3361 8.51479 24.6961 5.428 22.1312 3.22872C19.5662 1.02943 16.2656 -0.120151 12.8896 0.0099507C9.51359 0.140053 6.31118 1.54025 3.92307 3.93041C1.53496 6.32057 0.137251 9.52442 0.00958311 12.901C-0.118085 16.2776 1.0337 19.5778 3.23451 22.1416C5.43532 24.7053 8.52284 26.3434 11.8794 26.7281C15.2359 27.1128 18.6139 26.2158 21.3376 24.2166H21.3355C21.3974 24.2991 21.4634 24.3774 21.5377 24.4538L29.478 32.3952C29.8647 32.7823 30.3893 32.9998 30.9364 33C31.4835 33.0002 32.0083 32.783 32.3953 32.3962C32.7823 32.0095 32.9998 31.4848 33 30.9376C33.0002 30.3904 32.783 29.8656 32.3963 29.4785L24.456 21.5371C24.3823 21.4624 24.303 21.3935 24.2188 21.3308V21.3329ZM24.7509 13.4038C24.7509 14.8936 24.4575 16.3689 23.8875 17.7453C23.3174 19.1218 22.4819 20.3724 21.4285 21.4259C20.3752 22.4794 19.1247 23.315 17.7485 23.8852C16.3723 24.4553 14.8972 24.7487 13.4076 24.7487C11.918 24.7487 10.4429 24.4553 9.0667 23.8852C7.69046 23.315 6.43998 22.4794 5.38666 21.4259C4.33333 20.3724 3.49779 19.1218 2.92773 17.7453C2.35768 16.3689 2.06427 14.8936 2.06427 13.4038C2.06427 10.395 3.25937 7.50933 5.38666 5.38174C7.51394 3.25416 10.3992 2.05889 13.4076 2.05889C16.416 2.05889 19.3013 3.25416 21.4285 5.38174C23.5558 7.50933 24.7509 10.395 24.7509 13.4038V13.4038Z"
                                                                fill="black"
                                                            />
                                                        </svg>
                                                        Searching Data
                                                    </a>
                                                </NextLink>
                                            </li>
                                        )}
                                        {privilege.includes('Report') && (
                                            <li
                                                className={
                                                    asPath === '/report'
                                                        ? 'active'
                                                        : ''
                                                }
                                            >
                                                <NextLink href="/report">
                                                    <a>
                                                        <svg
                                                            width="43"
                                                            height="36"
                                                            viewBox="0 0 43 36"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M4.47913 5.25C4.47913 4.65326 4.76227 4.08097 5.26628 3.65901C5.77028 3.23705 6.45386 3 7.16663 3H28.6666C29.3794 3 30.063 3.23705 30.567 3.65901C31.071 4.08097 31.3541 4.65326 31.3541 5.25V33H7.16663C6.45386 33 5.77028 32.7629 5.26628 32.341C4.76227 31.919 4.47913 31.3467 4.47913 30.75V5.25ZM31.3541 18C31.3541 17.6022 31.5429 17.2206 31.8789 16.9393C32.2149 16.658 32.6706 16.5 33.1458 16.5H36.7291C37.2043 16.5 37.66 16.658 37.996 16.9393C38.332 17.2206 38.5208 17.6022 38.5208 18V30.75C38.5208 31.3467 38.2376 31.919 37.7336 32.341C37.2296 32.7629 36.5461 33 35.8333 33H31.3541V18Z"
                                                                stroke="black"
                                                                strokeOpacity="0.7"
                                                                strokeWidth="4"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M9.85413 9H17.0208M9.85413 14.25H20.6041"
                                                                stroke="black"
                                                                strokeOpacity="0.7"
                                                                strokeWidth="4"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                        Report
                                                    </a>
                                                </NextLink>
                                            </li>
                                        )}
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </li>
                </ul>
            </div>
        </div>
    )
}
