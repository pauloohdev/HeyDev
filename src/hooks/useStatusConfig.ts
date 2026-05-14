import { STATUS_CONFIG, getStatusStyle, getStatusIcon, getStatusLabel } from '../constants/statusConfig';

export function useStatusConfig() {
  return {
    config: STATUS_CONFIG,
    getStyle: getStatusStyle,
    getIcon: getStatusIcon,
    getLabel: getStatusLabel
  };
}
