import C from '../config/constants';

export default {
    methods: {
        priorityBackgroundColorCls(priority) {
            switch (priority) {
                case C.MESSAGE_PRIORITY.HIGH:
                    return 'bg-gradient-red';
                case C.MESSAGE_PRIORITY.MEDIUM:
                    return 'bg-gradient-orange';
                case C.MESSAGE_PRIORITY.LOW:
                    return 'bg-gradient-green';
                default:
                    return '';
            }
        },
        priorityColorCls(priority) {
            switch (priority) {
                case C.MESSAGE_PRIORITY.HIGH:
                    return 'text-red';
                case C.MESSAGE_PRIORITY.MEDIUM:
                    return 'text-orange';
                case C.MESSAGE_PRIORITY.LOW:
                    return 'text-green';
                default:
                    return '';
            }
        },
        priorityIconCls(priority) {
            switch (priority) {
                case C.MESSAGE_PRIORITY.HIGH:
                case C.MESSAGE_PRIORITY.MEDIUM:
                    return 'fa-arrow-up';
                case C.MESSAGE_PRIORITY.LOW:
                    return 'fa-arrow-down';
                default:
                    return '';
            }
        },
        priorityTextShort(priority) {
            switch (priority) {
                case C.MESSAGE_PRIORITY.HIGH:
                    return 'High';
                case C.MESSAGE_PRIORITY.MEDIUM:
                    return 'Med';
                case C.MESSAGE_PRIORITY.LOW:
                    return 'Low';
                default:
                    return '';
            }
        },
        statusColorCls(status) {
            switch (status) {
                case C.THREAD_STATUS.NEW:
                    return 'text-red';
                case C.THREAD_STATUS.IN_PROGRESS:
                    return 'text-orange';
                case C.THREAD_STATUS.CLOSED:
                    return 'text-green';
                default:
                    return '';
            }
        },
        statusText(status) {
            switch (status) {
                case C.THREAD_STATUS.NEW:
                    return 'New';
                case C.THREAD_STATUS.IN_PROGRESS:
                    return 'In Progress';
                case C.THREAD_STATUS.CLOSED:
                    return 'Closed';
                default:
                    return '';
            }
        }
    }
}
