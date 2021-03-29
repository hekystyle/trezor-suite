import { FlagProps } from '@trezor/components';

export type TradeType = 'buy' | 'sell' | 'exchange' | 'spend';

export type Option = { value: string; label: string };
export type CountryOption = { value: FlagProps['country']; label: string };
export type DefaultCountryOption = { value: string; label?: string };
