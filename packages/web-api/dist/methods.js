"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cursorPaginationEnabledMethods = exports.Methods = void 0;
const eventemitter3_1 = require("eventemitter3");
// NOTE: could create a named type alias like data types like `SlackUserID: string`
/**
 * Binds a certain `method` and its arguments and result types to the `apiCall` method in `WebClient`.
 */
function bindApiCall(self, method) {
    // We have to "assert" that the bound method does indeed return the more specific `Result` type instead of just
    // `WebAPICallResult`
    return self.apiCall.bind(self, method);
}
/**
 * A class that defines all Web API methods, their arguments type, their response type, and binds those methods to the
 * `apiCall` class method.
 */
class Methods extends eventemitter3_1.EventEmitter {
    // TODO: As of writing, `WebClient` already extends EventEmitter...
    // and I want WebClient to extend this class...
    // and multiple inheritance in JS is cursed...
    // so I'm just making this class extend EventEmitter.
    //
    // It shouldn't be here, indeed. Nothing here uses it, indeed. But it must be here for the sake of sanity.
    constructor() {
        super();
        this.admin = {
            apps: {
                approve: bindApiCall(this, 'admin.apps.approve'),
                approved: {
                    list: bindApiCall(this, 'admin.apps.approved.list'),
                },
                requests: {
                    list: bindApiCall(this, 'admin.apps.requests.list'),
                },
                restrict: bindApiCall(this, 'admin.apps.restrict'),
                restricted: {
                    list: bindApiCall(this, 'admin.apps.restricted.list'),
                },
            },
            conversations: {
                setTeams: bindApiCall(this, 'admin.conversations.setTeams'),
                restrictAccess: {
                    addGroup: bindApiCall(this, 'admin.conversations.restrictAccess.addGroup'),
                    listGroups: bindApiCall(this, 'admin.conversations.restrictAccess.listGroups'),
                    removeGroup: bindApiCall(this, 'admin.conversations.restrictAccess.removeGroup'),
                },
            },
            inviteRequests: {
                approve: bindApiCall(this, 'admin.inviteRequests.approve'),
                deny: bindApiCall(this, 'admin.inviteRequests.deny'),
                list: bindApiCall(this, 'admin.inviteRequests.list'),
                approved: {
                    list: bindApiCall(this, 'admin.inviteRequests.approved.list'),
                },
                denied: {
                    list: bindApiCall(this, 'admin.inviteRequests.denied.list'),
                },
            },
            teams: {
                admins: {
                    list: bindApiCall(this, 'admin.teams.admins.list'),
                },
                create: bindApiCall(this, 'admin.teams.create'),
                list: bindApiCall(this, 'admin.teams.list'),
                owners: {
                    list: bindApiCall(this, 'admin.teams.owners.list'),
                },
                settings: {
                    info: bindApiCall(this, 'admin.teams.settings.info'),
                    setDefaultChannels: bindApiCall(this, 'admin.teams.settings.setDefaultChannels'),
                    setDescription: bindApiCall(this, 'admin.teams.settings.setDescription'),
                    setDiscoverability: bindApiCall(this, 'admin.teams.settings.setDiscoverability'),
                    setIcon: bindApiCall(this, 'admin.teams.settings.setIcon'),
                    setName: bindApiCall(this, 'admin.teams.settings.setName'),
                },
            },
            usergroups: {
                addChannels: bindApiCall(this, 'admin.usergroups.addChannels'),
                addTeams: bindApiCall(this, 'admin.usergroups.addTeams'),
                listChannels: bindApiCall(this, 'admin.usergroups.listChannels'),
                removeChannels: bindApiCall(this, 'admin.usergroups.removeChannels'),
            },
            users: {
                session: {
                    reset: bindApiCall(this, 'admin.users.session.reset'),
                },
                assign: bindApiCall(this, 'admin.users.assign'),
                invite: bindApiCall(this, 'admin.users.invite'),
                list: bindApiCall(this, 'admin.users.list'),
                remove: bindApiCall(this, 'admin.users.remove'),
                setAdmin: bindApiCall(this, 'admin.users.setAdmin'),
                setExpiration: bindApiCall(this, 'admin.users.setExpiration'),
                setOwner: bindApiCall(this, 'admin.users.setOwner'),
                setRegular: bindApiCall(this, 'admin.users.setRegular'),
            },
        };
        this.api = {
            test: bindApiCall(this, 'api.test'),
        };
        this.auth = {
            revoke: bindApiCall(this, 'auth.revoke'),
            test: bindApiCall(this, 'auth.test'),
        };
        this.bots = {
            info: bindApiCall(this, 'bots.info'),
        };
        this.calls = {
            add: bindApiCall(this, 'calls.add'),
            end: bindApiCall(this, 'calls.end'),
            info: bindApiCall(this, 'calls.info'),
            update: bindApiCall(this, 'calls.update'),
            participants: {
                add: bindApiCall(this, 'calls.participants.add'),
                remove: bindApiCall(this, 'calls.participants.remove'),
            },
        };
        this.channels = {
            archive: bindApiCall(this, 'channels.archive'),
            create: bindApiCall(this, 'channels.create'),
            history: bindApiCall(this, 'channels.history'),
            info: bindApiCall(this, 'channels.info'),
            invite: bindApiCall(this, 'channels.invite'),
            join: bindApiCall(this, 'channels.join'),
            kick: bindApiCall(this, 'channels.kick'),
            leave: bindApiCall(this, 'channels.leave'),
            list: bindApiCall(this, 'channels.list'),
            mark: bindApiCall(this, 'channels.mark'),
            rename: bindApiCall(this, 'channels.rename'),
            replies: bindApiCall(this, 'channels.replies'),
            setPurpose: bindApiCall(this, 'channels.setPurpose'),
            setTopic: bindApiCall(this, 'channels.setTopic'),
            unarchive: bindApiCall(this, 'channels.unarchive'),
        };
        this.chat = {
            delete: bindApiCall(this, 'chat.delete'),
            deleteScheduledMessage: bindApiCall(this, 'chat.deleteScheduledMessage'),
            getPermalink: bindApiCall(this, 'chat.getPermalink'),
            meMessage: bindApiCall(this, 'chat.meMessage'),
            postEphemeral: bindApiCall(this, 'chat.postEphemeral'),
            postMessage: bindApiCall(this, 'chat.postMessage'),
            scheduleMessage: bindApiCall(this, 'chat.scheduleMessage'),
            scheduledMessages: {
                list: bindApiCall(this, 'chat.scheduledMessages.list'),
            },
            unfurl: bindApiCall(this, 'chat.unfurl'),
            update: bindApiCall(this, 'chat.update'),
        };
        this.conversations = {
            archive: bindApiCall(this, 'conversations.archive'),
            close: bindApiCall(this, 'conversations.close'),
            create: bindApiCall(this, 'conversations.create'),
            history: bindApiCall(this, 'conversations.history'),
            info: bindApiCall(this, 'conversations.info'),
            invite: bindApiCall(this, 'conversations.invite'),
            join: bindApiCall(this, 'conversations.join'),
            kick: bindApiCall(this, 'conversations.kick'),
            leave: bindApiCall(this, 'conversations.leave'),
            list: bindApiCall(this, 'conversations.list'),
            mark: bindApiCall(this, 'conversations.mark'),
            members: bindApiCall(this, 'conversations.members'),
            open: bindApiCall(this, 'conversations.open'),
            rename: bindApiCall(this, 'conversations.rename'),
            replies: bindApiCall(this, 'conversations.replies'),
            setPurpose: bindApiCall(this, 'conversations.setPurpose'),
            setTopic: bindApiCall(this, 'conversations.setTopic'),
            unarchive: bindApiCall(this, 'conversations.unarchive'),
        };
        this.views = {
            open: bindApiCall(this, 'views.open'),
            publish: bindApiCall(this, 'views.publish'),
            push: bindApiCall(this, 'views.push'),
            update: bindApiCall(this, 'views.update'),
        };
        this.dialog = {
            open: bindApiCall(this, 'dialog.open'),
        };
        this.dnd = {
            endDnd: bindApiCall(this, 'dnd.endDnd'),
            endSnooze: bindApiCall(this, 'dnd.endSnooze'),
            info: bindApiCall(this, 'dnd.info'),
            setSnooze: bindApiCall(this, 'dnd.setSnooze'),
            teamInfo: bindApiCall(this, 'dnd.teamInfo'),
        };
        this.emoji = {
            list: bindApiCall(this, 'emoji.list'),
        };
        this.files = {
            delete: bindApiCall(this, 'files.delete'),
            info: bindApiCall(this, 'files.info'),
            list: bindApiCall(this, 'files.list'),
            revokePublicURL: bindApiCall(this, 'files.revokePublicURL'),
            sharedPublicURL: bindApiCall(this, 'files.sharedPublicURL'),
            upload: bindApiCall(this, 'files.upload'),
            comments: {
                delete: bindApiCall(this, 'files.comments.delete'),
            },
            remote: {
                info: bindApiCall(this, 'files.remote.info'),
                list: bindApiCall(this, 'files.remote.list'),
                add: bindApiCall(this, 'files.remote.add'),
                update: bindApiCall(this, 'files.remote.update'),
                remove: bindApiCall(this, 'files.remote.remove'),
                share: bindApiCall(this, 'files.remote.share'),
            },
        };
        this.groups = {
            archive: bindApiCall(this, 'groups.archive'),
            create: bindApiCall(this, 'groups.create'),
            createChild: bindApiCall(this, 'groups.createChild'),
            history: bindApiCall(this, 'groups.history'),
            info: bindApiCall(this, 'groups.info'),
            invite: bindApiCall(this, 'groups.invite'),
            kick: bindApiCall(this, 'groups.kick'),
            leave: bindApiCall(this, 'groups.leave'),
            list: bindApiCall(this, 'groups.list'),
            mark: bindApiCall(this, 'groups.mark'),
            open: bindApiCall(this, 'groups.open'),
            rename: bindApiCall(this, 'groups.rename'),
            replies: bindApiCall(this, 'groups.replies'),
            setPurpose: bindApiCall(this, 'groups.setPurpose'),
            setTopic: bindApiCall(this, 'groups.setTopic'),
            unarchive: bindApiCall(this, 'groups.unarchive'),
        };
        this.im = {
            close: bindApiCall(this, 'im.close'),
            history: bindApiCall(this, 'im.history'),
            list: bindApiCall(this, 'im.list'),
            mark: bindApiCall(this, 'im.mark'),
            open: bindApiCall(this, 'im.open'),
            replies: bindApiCall(this, 'im.replies'),
        };
        this.migration = {
            exchange: bindApiCall(this, 'migration.exchange'),
        };
        this.mpim = {
            close: bindApiCall(this, 'mpim.close'),
            history: bindApiCall(this, 'mpim.history'),
            list: bindApiCall(this, 'mpim.list'),
            mark: bindApiCall(this, 'mpim.mark'),
            open: bindApiCall(this, 'mpim.open'),
            replies: bindApiCall(this, 'mpim.replies'),
        };
        this.oauth = {
            access: bindApiCall(this, 'oauth.access'),
            v2: {
                access: bindApiCall(this, 'oauth.v2.access'),
            },
        };
        this.pins = {
            add: bindApiCall(this, 'pins.add'),
            list: bindApiCall(this, 'pins.list'),
            remove: bindApiCall(this, 'pins.remove'),
        };
        this.reactions = {
            add: bindApiCall(this, 'reactions.add'),
            get: bindApiCall(this, 'reactions.get'),
            list: bindApiCall(this, 'reactions.list'),
            remove: bindApiCall(this, 'reactions.remove'),
        };
        this.reminders = {
            add: bindApiCall(this, 'reminders.add'),
            complete: bindApiCall(this, 'reminders.complete'),
            delete: bindApiCall(this, 'reminders.delete'),
            info: bindApiCall(this, 'reminders.info'),
            list: bindApiCall(this, 'reminders.list'),
        };
        this.rtm = {
            connect: bindApiCall(this, 'rtm.connect'),
            start: bindApiCall(this, 'rtm.start'),
        };
        this.search = {
            all: bindApiCall(this, 'search.all'),
            files: bindApiCall(this, 'search.files'),
            messages: bindApiCall(this, 'search.messages'),
        };
        this.stars = {
            add: bindApiCall(this, 'stars.add'),
            list: bindApiCall(this, 'stars.list'),
            remove: bindApiCall(this, 'stars.remove'),
        };
        this.team = {
            accessLogs: bindApiCall(this, 'team.accessLogs'),
            billableInfo: bindApiCall(this, 'team.billableInfo'),
            info: bindApiCall(this, 'team.info'),
            integrationLogs: bindApiCall(this, 'team.integrationLogs'),
            profile: {
                get: bindApiCall(this, 'team.profile.get'),
            },
        };
        this.usergroups = {
            create: bindApiCall(this, 'usergroups.create'),
            disable: bindApiCall(this, 'usergroups.disable'),
            enable: bindApiCall(this, 'usergroups.enable'),
            list: bindApiCall(this, 'usergroups.list'),
            update: bindApiCall(this, 'usergroups.update'),
            users: {
                list: bindApiCall(this, 'usergroups.users.list'),
                update: bindApiCall(this, 'usergroups.users.update'),
            },
        };
        this.users = {
            conversations: bindApiCall(this, 'users.conversations'),
            deletePhoto: bindApiCall(this, 'users.deletePhoto'),
            getPresence: bindApiCall(this, 'users.getPresence'),
            identity: bindApiCall(this, 'users.identity'),
            info: bindApiCall(this, 'users.info'),
            list: bindApiCall(this, 'users.list'),
            lookupByEmail: bindApiCall(this, 'users.lookupByEmail'),
            setPhoto: bindApiCall(this, 'users.setPhoto'),
            setPresence: bindApiCall(this, 'users.setPresence'),
            profile: {
                get: bindApiCall(this, 'users.profile.get'),
                set: bindApiCall(this, 'users.profile.set'),
            },
        };
    }
}
exports.Methods = Methods;
// A set of method names is initialized here and added to each time an argument type extends the CursorPaginationEnabled
// interface, so that methods are checked against this set when using the pagination helper. If the method name is not
// found, a warning is emitted to guide the developer to using the method correctly.
exports.cursorPaginationEnabledMethods = new Set();
exports.cursorPaginationEnabledMethods.add('admin.apps.approved.list');
exports.cursorPaginationEnabledMethods.add('admin.apps.requests.list');
exports.cursorPaginationEnabledMethods.add('admin.apps.restricted.list');
exports.cursorPaginationEnabledMethods.add('admin.inviteRequests.approved.list');
exports.cursorPaginationEnabledMethods.add('admin.inviteRequests.denied.list');
exports.cursorPaginationEnabledMethods.add('admin.inviteRequests.list');
exports.cursorPaginationEnabledMethods.add('admin.teams.admins.list');
exports.cursorPaginationEnabledMethods.add('admin.teams.list');
exports.cursorPaginationEnabledMethods.add('admin.teams.owners.list');
exports.cursorPaginationEnabledMethods.add('admin.users.list');
exports.cursorPaginationEnabledMethods.add('channels.list');
exports.cursorPaginationEnabledMethods.add('chat.scheduledMessages.list');
exports.cursorPaginationEnabledMethods.add('conversations.history');
exports.cursorPaginationEnabledMethods.add('conversations.list');
exports.cursorPaginationEnabledMethods.add('conversations.members');
exports.cursorPaginationEnabledMethods.add('conversations.replies');
exports.cursorPaginationEnabledMethods.add('files.info');
exports.cursorPaginationEnabledMethods.add('files.remote.list');
exports.cursorPaginationEnabledMethods.add('groups.list');
exports.cursorPaginationEnabledMethods.add('im.list');
exports.cursorPaginationEnabledMethods.add('mpim.list');
exports.cursorPaginationEnabledMethods.add('reactions.list');
exports.cursorPaginationEnabledMethods.add('stars.list');
exports.cursorPaginationEnabledMethods.add('users.conversations');
exports.cursorPaginationEnabledMethods.add('users.list');
__exportStar(require("@slack/types"), exports);
//# sourceMappingURL=methods.js.map