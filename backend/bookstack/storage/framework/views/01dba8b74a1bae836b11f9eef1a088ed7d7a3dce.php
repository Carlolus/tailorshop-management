<div component="dropdown" class="dropdown-container" id="export-menu">
    <div refs="dropdown@toggle" class="icon-list-item"
         aria-haspopup="true" aria-expanded="false" aria-label="<?php echo e(trans('entities.export')); ?>" tabindex="0">
        <span><?php echo icon('export'); ?></span>
        <span><?php echo e(trans('entities.export')); ?></span>
    </div>
    <ul refs="dropdown@menu" class="wide dropdown-menu" role="menu">
        <li><a href="<?php echo e($entity->getUrl('/export/html')); ?>" target="_blank" class="label-item"><span><?php echo e(trans('entities.export_html')); ?></span><span>.html</span></a></li>
        <li><a href="<?php echo e($entity->getUrl('/export/pdf')); ?>" target="_blank" class="label-item"><span><?php echo e(trans('entities.export_pdf')); ?></span><span>.pdf</span></a></li>
        <li><a href="<?php echo e($entity->getUrl('/export/plaintext')); ?>" target="_blank" class="label-item"><span><?php echo e(trans('entities.export_text')); ?></span><span>.txt</span></a></li>
        <li><a href="<?php echo e($entity->getUrl('/export/markdown')); ?>" target="_blank" class="label-item"><span><?php echo e(trans('entities.export_md')); ?></span><span>.md</span></a></li>
    </ul>
</div>
<?php /**PATH /var/www/bookstack/resources/views/entities/export-menu.blade.php ENDPATH**/ ?>