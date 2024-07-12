type Event = {
    object: string,
    actor_id: string,
    actor_name: string,
    group: string,
    action_id: string,
    target_id: string,
    target_name: string,
    location: string,
    occurred_at: Date,
    metadataId: string
}

export default Event;